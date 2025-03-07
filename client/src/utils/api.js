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

export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);

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

export const updateUserRole = async (userId, newRole, token) => {
  const response = await axios.put(
    `/api/v1/users/${userId}/role`,
    { role: newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
