import axios from "axios";
export function convertToDateOnly(dateString) {
  return dateString.split("T")[0];
}
export const refreshToken = () =>
  //axios.post("http://localhost:3001/api/v2/authentication/refresh", {}, { withCredentials: true });
 axios.post(
  "https://api.alfurqaninternational.org/api/v2/authentication/refresh",
   {},
  { withCredentials: true }
);
const customFetch = axios.create({
  //baseURL: "http://localhost:3001/api/v2/",
   baseURL: "https://api.alfurqaninternational.org/api/v2/",
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
// customFetch.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status !== 401) {
//       return Promise.reject(error);
//     }

//     // 🚫 Do NOT refresh for auth routes
//     if (
//       originalRequest.url?.includes("/authentication/login") ||
//       originalRequest.url?.includes("/authentication/logout") ||
//       originalRequest.url?.includes("/authentication/refresh")
//     ) {
//       return Promise.reject(error);
//     }

//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: () => resolve(customFetch(originalRequest)),
//           reject,
//         });
//       });
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       await refreshToken();
//       processQueue(null);
//       return customFetch(originalRequest);
//     } catch (refreshError) {
//       processQueue(refreshError);
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

export default customFetch;
