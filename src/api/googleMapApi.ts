import axios from "axios"

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
  }
}

export default googleMapApi