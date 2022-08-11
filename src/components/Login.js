import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "./LoginApi";

const loginApi = new LoginApi();
function Login() {
  const [formState, setFormState] = useState({});

  const navigate = useNavigate();

  function onFormInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[field] = value;
    setFormState(newState);
  }
  async function login(formState) {
    const response = await loginApi.login(formState);
    const messageResponse = response.data;
    // if (messageResponse.responseType === "SUCCESS") {
    //   toast.success(messageResponse.message);
    // }
  }

  function signIn(e) {
    e.preventDefault();
    navigate("/AdminPage");
  }
  function signUp(e) {
    e.preventDefault();
    navigate("/Register");
  }
  return (
    <form className="Form">
      <div className="sub-main">
        <h2>Sign In</h2>
        <div className="createhr">
          <label>User Name: </label> <br />
          <input
            type="text"
            placeholder="user name"
            className="name"
            name="username"
            onChange={onFormInputChange}
          />
          <br />
          <br />
          <label>Password: </label> <br />
          <input
            type="password"
            placeholder="password"
            className="name"
            name="password"
            onChange={onFormInputChange}
          />
          {/* <p>{userName}, {password}</p> */}
          <div className="login-button">
            <button onClick={signIn}>SIGN IN</button>
          </div>
          <NavLink to="/Register" className="forgotPassword">
            Forget Password ?
          </NavLink>
        </div>
      </div>
    </form>
  );
}

export default Login;
