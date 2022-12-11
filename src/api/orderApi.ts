import Address from "../interfaces/address";
import Order from "../interfaces/Order";
import ResponseData from "../interfaces/responseData";
import ResponseGetPrice from "../interfaces/responseGetPrice";
import axiosClient from "./axiosClient"


const orderApi = {
  async create(
    addressStart: Address,
    addressEnd: Address,
    description: string,
    distance: number,
    customerNote: string,
    imgOrder: string,
    paymentId: number,
    categoryId: number,
  ) {
    const url = `order/`;
    const data = JSON.stringify({
      "address_start": addressStart,
      "address_end": addressEnd,
      "description": description,
      "distance": distance,
      "customer_notes": customerNote,
      "img_order": imgOrder,
      "payment": paymentId,
      "category": categoryId
    });
    await axiosClient.post(url, data);
  },

  async getPrice(distance: number, is_protected: number) {
    const url = 'distance/get_price/';
    const data = JSON.stringify({
      "distance": distance,
      "is_protected": is_protected
    });
    const result: ResponseData<ResponseGetPrice> = await axiosClient.post(url, data);
    return result.data;
  },
  async getHistoryOrder(page: number): Promise<any> {
    const url = `/order/?page=${page}`;
    const result: any = await axiosClient.get(url);
    return result.data;
  },
}

export default orderApi;
