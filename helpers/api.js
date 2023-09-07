import axios from "axios";
import config from "../config/app";

export const axiosInstace = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 20000,
});

export const api = (requestType, url, payload) => {
  return new Promise((resolve, reject) => {
    axiosInstace[requestType](url, payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
