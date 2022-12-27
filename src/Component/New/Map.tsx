import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react"
import googleMapApi from "../../api/googleMapApi";
import Address from "../../interfaces/address";


const Map = (props: any) => {
  const { address, setAddress } = props
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [marker, setMarker] = useState<any>([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 14
      });
      map.current.on("click", (e: any) => {
        const node = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map.current)
        setMarker((prev: any) => [...prev, node]);
        googleMapApi.getNameByLocation(e.lngLat.lng, e.lngLat.lat).then((data: Address) => {
          setAddress(data)
        })
      });
    }, (error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    if (marker.length > 1) {
      const markerDel = marker.shift();
      markerDel.remove();
      setMarker(marker);
    }
  }, [marker, address])

  return (
    <>
      <div ref={mapContainer} className="size-map" />
    </>
  )
}

export default Map;