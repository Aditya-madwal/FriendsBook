// here the api that is requested by the user will be altered and headers will be added to add bearer token

import axios from "axios";

import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
// ----------------------------------------------
// import axios from "axios";
// import { ACCESS_TOKEN } from "./constants";

// const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
