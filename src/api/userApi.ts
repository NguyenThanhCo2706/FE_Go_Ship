import ResponseGenerator from "../interfaces/responseGenerator";
import axiosClient from "./axiosClient"
import User from "../interfaces/user";


const userApi = {
  async getDetail(): Promise<ResponseGenerator<User>> {
    const url = `customer/detail/`;
    const result: ResponseGenerator<User> = await axiosClient.get(url);
    return result;
  },

}

export default userApi;
