import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const formValid = { username: "", password: "" };
  const [formValues, setFormValues] = useState(formValid);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [login, setLogin] = useState();

  const navigate = useNavigate();
  // console.log("formValues= ", formValues);

  const nameValidation = (name) => {
    console.log(name);
    // console.log("name validation", "name== ", name);
    let convert = +name;
    if (name == "" || name == null || name.length == 0) {
      // console.log("name = ", formValues.name);
      setError("please fill user name  ");
    } else if (name.length >= 1 && name.length < 3) {
      setError("* min 3 char required ");
    } else if (isNaN(convert) !== true) {
      setError("Only numbers are not a valid ");
    } else {
      setError("");
    }
  };
  //password validation
  const passwordValid = (password) => {
    const validPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.match(validPassword)) {
      setPasswordError("");
    } else if (password == "") {
      setPasswordError("password cannot be empty");
    } else {
      setPasswordError(
        "min 8 characters,(1)lower/uppercase,num,special character(!@#$%^&*)"
      );
    }
  };

  //toast
  // const notify = () =>
  //   toast.success("🦄 Wow so easy!", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });

  //OnSubmit

  const OnLogIn = () => {
    console.log("== ", formValues);
    if (formValues.username == "" || formValues.password == "") {
      console.log("login clicked", formValues.name);
      setError("user name is required");
      setPasswordError("password is required");
    } else {
      console.log("else", formValues.name);
      requestToken();
    }
  };

  //requesttoken
  const requestToken = async () => {
    const token = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=b19815284b9ae66c9aaa41aa1147b407"
    );
    // console.log(token);
    const data = await token.json();
    console.log("token api****", data);
    localStorage.setItem("request-token", data.request_token);

    const request = localStorage.getItem("request-token");
    console.log(request);
    const login = await fetch(
      "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=b19815284b9ae66c9aaa41aa1147b407",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          request_token: request,
        }),
      }
    );
    const res = await login.json();
    sessionStorage.setItem("login", JSON.stringify(res));
    setLogin(res);
    console.log("login", res);
    if (res?.success) {
      navigate("/movies");
      // <Protected res={res} />;
      console.log("if----------------------------------");
      // navigate("/movies");
    } else {
      console.log("else warning");

      setPasswordError(res.status_message);
    }
  };

  //post to API

  return (
    <div className="formContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="signIn">
          <h2>Sign in</h2>
          <p>Sign in to your Self Service Portal</p>
        </div>
        <input
          type="text"
          placeholder="username"
          value={formValues.username}
          onChange={(e) => {
            setFormValues({ ...formValues, username: e.target.value });
            nameValidation(e.target.value);
          }}
        />
        <div className="errorContainer">
          <p className="error">{error}</p>
        </div>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setFormValues({ ...formValues, password: e.target.value });
            passwordValid(e.target.value);
          }}
        />
        <div className="errorContainer">
          <p className="error">{passwordError}</p>
        </div>
        <input
          className="loginBtn"
          type="submit"
          value="LOG IN"
          onClick={() => {
            OnLogIn();
            <Navigate to="/movies" />;
            // notify();
          }}
        />
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Form;
