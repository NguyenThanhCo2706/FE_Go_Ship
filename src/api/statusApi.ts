import ResponseData from "../interfaces/responseData";
import Status from "../interfaces/status";
import axiosClient from "./axiosClient"


const statusApi = {
  async getList() {
    const url = `status/`;
    const result: ResponseData<any> = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },
}

export default statusApi;
