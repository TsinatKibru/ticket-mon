// useInitializeAuth.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import axios from "../utils/axiosConfig";
import { setUser } from "../redux/slices/authSlice";

const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId; // Extract userId from token

        // Fetch user data using the userId and token in the Authorization header
        axios
          .get(`/api/v1/users/${userId}`)
          .then((response) => {
            // Assume the response has user data in response.data.data
            dispatch(setUser(response.data.data));
          })
          .catch((err) => {
            console.error("Error fetching user data", err);
          });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [token, dispatch]);
};

export default useInitializeAuth;
