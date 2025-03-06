// Root.js
import React from "react";
import App from "./App";
import useInitializeAuth from "./hooks/useInitializeAuth";

const Root = () => {
  useInitializeAuth(); // Initialize auth (decode token, fetch user, etc.)
  return <App />;
};

export default Root;
