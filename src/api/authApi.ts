import axios from "axios";
import Auth from "../interfaces/auth";
import ResponseAuth from "../interfaces/responseAuth";
import ResponseData from "../interfaces/responseData";
import axiosClient from "./axiosClient"


const authApi = {
  async login(phone: string, password: string) {
    const url = `user/login/`;
    const data = JSON.stringify({
      "phone_number": phone,
      "password": password
    });
    const result: ResponseData<any> = await axiosClient.post(url, data);
    return result.data;
  },

  async register(auth: Auth) {
    const url = `user/register/`;
    const data = JSON.stringify({
      "phone_number": auth.phone_number,
      "password": auth.password,
      "role": auth.role,
      "token_device": auth.token_device,
    });
    const result: ResponseData<any> = await axiosClient.post(url, data);
    return result.data;
  },

  async logout() {
    const url = "user/logout/";
    await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}

export default authApi;
