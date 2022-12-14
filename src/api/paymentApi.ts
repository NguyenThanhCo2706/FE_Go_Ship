import ResponseData from "../interfaces/responseData";
import Payment from "../interfaces/payment";
import axiosClient from "./axiosClient"


const paymentApi = {
  async getList(): Promise<ResponseData<Array<Payment>>> {
    const url = `payment/`;
    const result: ResponseData<any> = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result;
  },

}

export default paymentApi;
