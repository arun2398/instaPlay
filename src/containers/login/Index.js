import React from "react";
import Form from "./Form";
import Header from "./Header";
const index = ({ notify }) => {
  return (
    <div className="container">
      <Header />
      <Form notify={notify} />
    </div>
  );
};

export default index;
