import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import axios from "../utils/axiosConfig";
import { setUser, setLoading, setError } from "../redux/slices/authSlice";
import { getTickets } from "../redux/slices/ticketSlice"; // Import ticket slice action
import { getUsersContent } from "../redux/slices/userSlice"; // Import user slice action

const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(setLoading(true));
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        // Fetch user data
        axios
          .get(`/api/v1/users/${userId}`)
          .then((userResponse) => {
            dispatch(setUser(userResponse.data.data));

            // Fetch all users (if needed)
            axios
              .get("/api/v1/users")
              .then((usersResponse) => {
                dispatch(getUsersContent(usersResponse.data.data));

                // Fetch all tickets
                axios
                  .get("/api/v1/tickets")
                  .then((ticketsResponse) => {
                    dispatch(getTickets(ticketsResponse.data.data));
                    dispatch(setLoading(false));
                  })
                  .catch((ticketsErr) => {
                    console.error("Error fetching tickets", ticketsErr);
                    dispatch(
                      setError(
                        "Failed to fetch tickets. Please try again later."
                      )
                    );
                    dispatch(setLoading(false));
                  });
              })
              .catch((usersErr) => {
                console.error("Error fetching users", usersErr);
                dispatch(
                  setError("Failed to fetch users. Please try again later.")
                );
                dispatch(setLoading(false));
              });
          })
          .catch((userErr) => {
            console.error("Error fetching user data", userErr);
            dispatch(
              setError("Failed to fetch user data. Please try again later.")
            );
            dispatch(setLoading(false));
          });
      } catch (error) {
        console.error("Failed to decode token", error);
        dispatch(setError("Invalid token. Please log in again."));
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(false));
    }
  }, [token, dispatch]);
};

export default useInitializeAuth;
