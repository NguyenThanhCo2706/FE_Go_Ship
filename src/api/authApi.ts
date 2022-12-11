import Auth from "../interfaces/auth";
import ResponseAuth from "../interfaces/responseAuth";
import ResponseData from "../interfaces/responseData";
import axiosClient from "./axiosClient"


const authApi = {
  async login(phone: string, password: string): Promise<ResponseData<ResponseAuth>> {
    const url = `user/login/`;
    const data = JSON.stringify({
      "phone_number": phone,
      "password": password
    });
    const result: ResponseData<ResponseAuth> = await axiosClient.post(url, data);
    return result;
  },

  async register(auth: Auth): Promise<ResponseData<ResponseAuth>> {
    const url = `user/register/`;
    const data = JSON.stringify({
      "phone_number": auth.phone_number,
      "password": auth.password,
      "role": auth.role,
      "token_device": auth.token_device,
    });
    const result: ResponseData<ResponseAuth> = await axiosClient.post(url, data);
    return result;
  }
}

export default authApi;
