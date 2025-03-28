// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5500"; // Replace with your backend URL
// axios.defaults.withCredentials = true;

// // Add an interceptor to include the JWT token in headers
// axios.interceptors.request.use((config) => {
//   const authData = JSON.parse(localStorage.getItem("auth"));
//   if (authData?.token) {
//     config.headers.Authorization = `Bearer ${authData.token}`;
//   }
//   return config;
// });

// export default axios;
// axiosConfig.js
import axios from "axios";

// Set the base URL for all requests
// axios.defaults.baseURL = "http://localhost:5500"; // Replace with your backend URL
axios.defaults.baseURL = "https://ticket-mon.vercel.app";
// Include credentials if needed (optional)
axios.defaults.withCredentials = true;

// Add an interceptor to include the JWT token from localStorage in headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
