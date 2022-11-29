import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://167.71.197.115:8000/api/v1/"

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem("token")}`
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
