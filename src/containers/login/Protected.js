import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const data = JSON.parse(sessionStorage.getItem("login"));
  console.log(data, "from local storage");
  // console.log(data?.success, "from protected rout");

  return data?.success ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
