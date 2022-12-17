import ResponseData from "../interfaces/responseData";
import axiosClient from "./axiosClient"
import User from "../interfaces/user";


const userApi = {
  async getDetail() {
    const url = `customer/detail/`;
    const result: ResponseData<User> = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },

  async updateProfile(user: User) {
    const url = "customer/detail/";
    const data = JSON.stringify(user);
    const result = await axiosClient.put(url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },

  async getDetailByPhone(phone: string) {
    try {
      const url = `user/get-info/`
      const data = JSON.stringify({
        phone_number: phone
      });
      const result: ResponseData<User> = await axiosClient.post(url, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      return result.data;
    }
    catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export default userApi;
