import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constraint";

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
  return Promise.reject(error);
});

export default axiosClient;
