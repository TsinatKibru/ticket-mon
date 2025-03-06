// // api.js
// import axios from "axios";

// const API_URL = "/api/v1/users/";

// export const fetchUsers = async (token) => {
//   const response = await axios.get(`${API_URL}`, {});
//   return response.data.data;
// };

// export const fetchTicketsAPi = async () => {
//   const response = await axios.get("/api/v1/tickets/", {});
//   return response.data.data;
// };

// export const deleteUserById = async (userId, token) => {
//   const response = await axios.delete(`${API_URL}/${userId}`, {});
//   return response.data;
// };

// export const addNewUser = async (userData) => {
//   const response = await axios.post(`/api/v1/auth/sign-up`, userData, {});
//   return response.data;
// };

// export const addTicketsAPi = async (ticketdata) => {
//   const response = await axios.post("/api/v1/tickets/", ticketdata, {});
//   return response.data.data;
// };
import axios from "./axiosConfig";

const API_URL = "/api/v1";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchTicketsAPi = async () => {
  try {
    const response = await axios.get(`${API_URL}/tickets/`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const deleteUserById = async (userId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const addNewUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};

export const addTicketsAPi = async (ticketdata) => {
  try {
    const response = await axios.post(`${API_URL}/tickets/`, ticketdata);
    return response.data.data;
  } catch (error) {
    console.error("Error adding new ticket:", error);
    throw error;
  }
};

export const deleteTicketsAPi = async (ticketId) => {
  try {
    const response = await axios.delete(`${API_URL}/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
};

export const updateTicketsAPi = async (ticketId, ticket) => {
  try {
    const response = await axios.put(`${API_URL}/tickets/${ticketId}`, ticket);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
};
