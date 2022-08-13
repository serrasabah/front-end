import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "./LoginApi";
import { toast } from "react-toastify";

const loginApi = new LoginApi();
function Login() {
  const [formState, setFormState] = useState({});

  const navigate = useNavigate();

  function onFormInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    console.log(newState);
    newState[field] = value;
    setFormState(newState);
  }
  
  async function login(event) {
    event.preventDefault();
    const response = await loginApi.login(formState);
    const messageResponse = response.data;
    // console.log(messageResponse)

     if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    navigate("/AdminPage");
    // console.log("hey")
    }
    else{
      toast.error(messageResponse.message);
    }
    
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
            <button onClick={login}>SIGN IN</button>
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

