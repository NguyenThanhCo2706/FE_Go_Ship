import ResponseGenerator from "../interfaces/responseGenerator";
import ResponseStatus from "../interfaces/responseStatus";
import axiosClient from "./axiosClient"


const statusApi = {
  async getList(): Promise<ResponseGenerator<Array<ResponseStatus>>> {
    const url = `status/`;
    const result: ResponseGenerator<any> = await axiosClient.get(url);
    return result;
  },
}

export default statusApi;
