import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./style.css"
import googleMapApi from '../../api/googleMapApi';
import { useNavigate } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoidGhhbmhjbyIsImEiOiJjbDgzdjFyeHYwOW1hM25tcHBlZTlveTAwIn0.hIwtYHcABmKWnG9goNPd5A';

export default function App() {
  const navigate = useNavigate();
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(14);
  const [listLocation, setListLocation] = useState<Array<any>>([])
  const [listMarkerLocation, setListMarkerLocation] = useState<Array<any>>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: zoom
      });
      
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)

      let marker = new mapboxgl.Marker({
        element: generateImageMarker(),
        draggable: true
      }).setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
      marker.getElement().addEventListener('click', () => {
        console.log(marker)
        alert("xin chào cu Bi");
      });
    }, (error) => {
      console.log(error)
    });
  }, [])

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    console.log("move")
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const aaa = (e: any) => {
    // console.log(e)
    // map.current = new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [109, 15.82],
    //   zoom: zoom
    // });
    // map.current.setCenter([108.25956, 15.82898]);
    // map.current.setZoom(13);
  }
  const searchMap = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setListLocation([])
      return;
    }
    const data: any = await googleMapApi.searchname(e.target.value);
    console.log(data.features);
    setListLocation(data.features)
    data.features.map((item: any) => {
      // console.log(item)
    })
  }
  const handleClickSearchItem = (location: Array<any>) => {
    map.current.setCenter(location);
    map.current.setZoom(zoom);
  }
  const generateImageMarker = () => {
    const el = document.createElement('img');
    el.src = process.env.PUBLIC_URL + "/images/person-icon.png"
    el.style.width = "30px";
    return el;
  }
  return (
    <div>
      <div className="div-search">
        <div className="">
          <div className="input-group">
            <input className="form-control" type="search" onChange={(e) => searchMap(e)} />
            <span className="input-group-append">
              <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="">
          {
            listLocation?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-light border border-1 event-hover p-1"
                  onClick={() => handleClickSearchItem(item.geometry.coordinates)}
                >
                  {item.properties.label}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" onClick={(e) => aaa(e)} />
      
    </div>
  );
}