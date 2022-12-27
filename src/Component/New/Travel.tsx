import { useRef, useEffect, useState } from 'react';
import ReactMapGL from "react-map-gl";
import mapboxgl from 'mapbox-gl';
import googleMapApi from '../../api/googleMapApi';
import { MAPBOX_ACCESS_TOKEN, MESSAGES } from '../../constraint';
import {
  database,
  refDatabase,
  onValue,
} from "../../config/firebase-config";
import { generateImageMarker } from '../../utils/generalMarker';
import MessageBox from '../Commons/MessageBox';



// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function Travel() {
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(14);
  const [listLocation, setListLocation] = useState<Array<any>>([])
  const [nameSearch, setNameSearch] = useState("");
  const [searchMarker, setSearchMarker] = useState<any>(null);
  const [waiting, setWaiting] = useState(false);

  const handleSearch = (e: any) => {
    setListLocation([]);
    setNameSearch(e.target.value)
  }

  useEffect(() => {
    setWaiting(true);
    navigator.geolocation.getCurrentPosition((position) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: zoom
      });

      let marker = new mapboxgl.Marker({
        element: generateImageMarker("marker-person.png"),
        draggable: true
      }).setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
      marker.getElement().addEventListener('click', () => {
        alert("xin chào");
      });

      onValue(refDatabase(database, `location`), data => {
        const getData: Array<any> = []
        for (const ele in data.exportVal()) {
          let obj: any = {};
          obj[ele] = data.val()[ele];
          getData.push(obj)
        }
        const listAddress = data.val();
        for (const key in listAddress) {
          console.log(listAddress[key].longitude)
          new mapboxgl.Marker({
            element: generateImageMarker("marker.png"),
            draggable: true
          }).setLngLat([listAddress[key].longitude, listAddress[key].latitude]).addTo(map.current);
        }
      })
      setWaiting(false);
    }, (error) => {
      console.log(error)
    });
    console.log("Cow1")
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
  const searchMap = async () => {
    if (nameSearch === "") {
      setListLocation([])
      return;
    }
    const data: any = await googleMapApi.searchname(nameSearch);
    console.log(data.features);
    setListLocation(data.features)
    data.features.map((item: any) => {
      // console.log(item)
    })
  }
  const handleClickSearchItem = (location: Array<any>) => {
    console.log(location);
    map.current.setCenter(location);
    map.current.setZoom(zoom);
    if (searchMarker) {
      searchMarker.remove();
    }
    setSearchMarker(new mapboxgl.Marker().setLngLat([location[0], location[1]]));
  }

  useEffect(() => {
    if (searchMarker) {
      searchMarker.addTo(map.current)
    }
  }, [searchMarker])

  return (
    <>
      <div className="col">
        <div className="fs-5 mb-3 fw-bold">Bản đồ</div>
        <div className="position-relative boder mb-4">
          <div className="div-search">
            <div className="">
              <div className="input-group">
                <input className="form-control" type="search" onChange={(e) => handleSearch(e)} />
                <span className="input-group-append" onClick={() => searchMap()}>
                  <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border " type="button">
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
      </div>
      {
        waiting ?
          <MessageBox
            title={MESSAGES.NOTIFICATION}
            icon="fa-solid fa-arrows-rotate text-danger"
            message={"Đang Xử Lý! Vui lòng chờ"}
            handleAcceptError={() => { }}
          />
          :
          <></>
      }
    </>
  );
}
