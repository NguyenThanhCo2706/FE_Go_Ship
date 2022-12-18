import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constraint";
import { handleError } from "../utils";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosClient.interceptors.response.use((response) => {
  return response.data;
}, function (error) {
  const message = handleError(error);
  return Promise.reject({ message: message });
});

export default axiosClient;
