import Category from "../interfaces/category";
import ResponseData from "../interfaces/responseData";
import axiosClient from "./axiosClient"


const categoryApi = {
  async getList(): Promise<ResponseData<Array<Category>>> {
    const url = `category/`;
    const result: ResponseData<any> = await axiosClient.get(url);
    return result;
  },

}

export default categoryApi;
