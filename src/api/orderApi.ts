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
    await axiosClient.post(url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },

  async getPrice(distance: number, is_protected: number) {
    const url = `distance/get_price/?distance=${distance}&is_protected=${is_protected}`;
    const result: ResponseData<ResponseGetPrice> = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },
  async getHistoryOrder(page: number): Promise<any> {
    const url = `/order/?page=${page}`;
    const result: any = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },
  async getOrderByStatus(page: any, statusId: any) {
    const url = `/order/status/?page=${page}${statusId ? "&status_id=" + statusId : ""}`;
    console.log(url);

    const result: ResponseData<any> = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },
  async getDetailOrder(id: number) {
    const url = `http://167.71.197.115:8000/api/v1/order/order-detail/${id}/`;
    const result: ResponseData<any> = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },
  async ratingOrder(orderId: number, feedback: string, rate: number) {
    const url = `/order/rate/`;
    const data = JSON.stringify({
      "order_id": orderId,
      "feedback": feedback,
      "rate": rate
    });
    const result: ResponseData<any> = await axiosClient.post(url, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result.data;
  },
}

export default orderApi;
