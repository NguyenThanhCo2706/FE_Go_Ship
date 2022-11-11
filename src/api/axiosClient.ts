import axios, { AxiosRequestConfig } from "axios";
import ResponseGenerator from "../interfaces/responseGenerator";

const BASE_URL = "https://go-ship-demo.herokuapp.com/api/v1/"

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosClient.interceptors.response.use((response) => {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient;
