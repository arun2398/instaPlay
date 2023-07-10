import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const data = JSON.parse(sessionStorage.getItem("login"));
  return data?.success ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
