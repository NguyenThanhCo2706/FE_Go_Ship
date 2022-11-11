import Auth from "../interfaces/auth";
import ResponseAuth from "../interfaces/responseAuth";
import ResponseGenerator from "../interfaces/responseGenerator";
import axiosClient from "./axiosClient"


const authApi = {
  async login(phone: string, password: string): Promise<ResponseGenerator<ResponseAuth>> {
    const url = `login/`;
    const data = JSON.stringify({
      "phone_number": phone,
      "password": password
    });
    const result: ResponseGenerator<ResponseAuth> = await axiosClient.post(url, data);
    return result;
  },

  async register(auth: Auth): Promise<ResponseGenerator<ResponseAuth>> {
    const url = `register/`;
    const data = JSON.stringify({
      "phone_number": auth.phone_number,
      "password": auth.password,
      "role": auth.role,
      "token_device": auth.token_device,
    });
    const result: ResponseGenerator<ResponseAuth> = await axiosClient.post(url, data);
    return result;
  }
}

export default authApi;
