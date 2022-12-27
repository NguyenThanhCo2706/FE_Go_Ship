import axios from "axios"
import Coordinates from "../interfaces/coordinates";

const API_KEY = "5b3ce3597851110001cf62484f65c4b2035549f28529cc860cb74c3c"

const googleMapApi = {
  async searchname(name: string) {
    const url = `https://api.openrouteservice.org/geocode/search`
    const result = await axios.get(url, {
      params: {
        "api_key": API_KEY,
        "text": name
      }
    });
    return result.data;
  },
  async distance(location: Coordinates, destination: Coordinates) {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car`
    const result = await axios.get(url, {
      params: {
        "api_key": API_KEY,
        "start": `${location.lng},${location.lat}`,
        "end": `${destination.lng},${destination.lat}`
      }
    })
    return result.data.features[0].properties.segments[0].distance;
  },
  async getNameByLocation(lng: number, lat: number) {
    const url = `https://api.openrouteservice.org/geocode/reverse`;
    const result = await axios.get(url, {
      params: {
        "api_key": API_KEY,
        "point.lon": lng,
        "point.lat": lat
      }
    });
    console.log(result);
    return {
      address_notes: result.data.features[0].properties.label,
      region: result.data.features[0].properties.region,
      country: result.data.features[0].properties.country,
      latitude: lat,
      longitude: lng
    };
  }
}

export default googleMapApi