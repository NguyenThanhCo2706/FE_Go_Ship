import Category from "../interfaces/category";
import ResponseGenerator from "../interfaces/responseGenerator";
import axiosClient from "./axiosClient"


const categoryApi = {
  async getList(): Promise<ResponseGenerator<Array<Category>>> {
    const url = `category/`;
    const result: ResponseGenerator<any> = await axiosClient.get(url);
    return result;
  },

}

export default categoryApi;
