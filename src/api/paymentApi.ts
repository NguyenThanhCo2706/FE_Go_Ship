import ResponseGenerator from "../interfaces/responseGenerator";
import Payment from "../interfaces/payment";
import axiosClient from "./axiosClient"


const paymentApi = {
  async getList(): Promise<ResponseGenerator<Array<Payment>>> {
    const url = `payment/`;
    const result: ResponseGenerator<any> = await axiosClient.get(url);
    return result;
  },

}

export default paymentApi;
