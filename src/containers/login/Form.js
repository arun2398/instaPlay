import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import Loading from "./Loading.gif";

const Form = ({ notify }) => {
  const formValid = { username: "", password: "" };
  const [formValues, setFormValues] = useState(formValid);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [login, setLogin] = useState();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("login"));
  const [local, setLocal] = useState(data);

  useEffect(() => {
    requestToken();
    local?.success ? navigate("/movies") : navigate("/");
  }, []);

  const nameValidation = (name) => {
    let convert = +name;
    if (name === "" || name === null || name.length === 0) {
      setError("username is required");
    } else if (name.length >= 1 && name.length < 3) {
      setError(" min 3 char required ");
    } else if (isNaN(convert) !== true) {
      setError("Only numbers are not a valid ");
    } else {
      setError("");
    }
  };

  //password validation
  const passwordValid = (password) => {
    const validPassword = password.length > 3;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (password.match(validPassword)) {
    //   setPasswordError("");
    // }
    if (password.length > 3) {
      setPasswordError("");
    } else if (password === "") {
      setPasswordError("password cannot be empty");
    } else {
      setPasswordError("password must have min 4 characters");
    }
  };

  //OnSubmit
  const OnLogIn = () => {
    if (
      (formValues.password.length > 0 && formValues.password.length <= 3) ||
      (formValues.username.length > 0 && formValues.username.length <= 2)
    ) {
      setPasswordError("invalid username or password");
    } else if (formValues.username === "" && formValues.password === "") {
      setError("username is required");
      setPasswordError("password is required");
    } else if (formValues.username === "") {
      setError("username is required");
    } else if (formValues.password === "") {
      setPasswordError("password is required");
    } else {
      setLoader(!loader);
      loginApi();
    }
  };

  const requestToken = async () => {
    const token = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=b19815284b9ae66c9aaa41aa1147b407"
    );
    const data = await token.json();
    localStorage.setItem("request-token", data.request_token);
  };

  const loginApi = async () => {
    const request = localStorage.getItem("request-token");
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
    if (res?.success) {
      notify();
      navigate("/movies");
    } else {
      setLoader(false);
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
        <div className="submit">
          <input
            className="loginBtn"
            type="submit"
            value={loader ? "" : "Login"}
            onClick={() => {
              OnLogIn();
            }}
          />
          <ProgressBar
            height="80"
            width="280"
            visible={loader}
            ariaLabel="progress-bar"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
