import axios from "axios";
// const customFetch = axios.create({
//     // baseURL: "/api/v1/",
//   baseURL: "http://localhost:3001/api/v2/",
//   withCredentials: true,
// });

export function convertToDateOnly(dateString) {
  return dateString.split("T")[0];
}
//export default customFetch;

//import axios from "axios";
//import { refreshToken } from "./refreshToken";
export const refreshToken = () =>
  axios.post("http://localhost:3001/api/v2/authentication/refresh", {}, { withCredentials: true });
const customFetch = axios.create({
  baseURL: "http://localhost:3001/api/v2/",
  withCredentials: true,
});

// prevents infinite loops
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

customFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // only handle 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // if refresh already running, queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(customFetch(originalRequest)),
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshToken();
      processQueue(null);
      return customFetch(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default customFetch;
