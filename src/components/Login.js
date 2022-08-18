import React, { useState, createContext  } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../Api/LoginApi";
import { toast } from "react-toastify";


const loginApi = new LoginApi();

function Login() {
  const [formState, setFormState] = useState({});
  const[username, setUsername] = useState();
  const[password, setPassword] = useState();
  const navigate = useNavigate();
  
  function onUserInputChange(event){
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[field] = value;
    setUsername(value);
    setFormState(newState);
  }

  function onPasswordInputChange(event){
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[field] = value;
    setPassword(value);
    setFormState(newState);
  }

  async function login(event) {
    console.log("formstate" + formState);
    event.preventDefault();
    if(!formState.username || !formState.password){
      toast.warning("Boş geçilemez");
    }else{
    const response = await loginApi.login(formState);
    const messageResponse = response.data;
     console.log(formState)

     if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      window.localStorage.setItem("username", username);
      const name = username.toUpperCase();
      console.log(name);
      navigate('/AdminPage',{state:{name:name}});
    // console.log("hey")

    }
    else{
      toast.error(messageResponse.message);
    }
    
  }
  }
  return (
    <>
    <form className="Form">
      <div className="sub-main">
        <h2>Sign In</h2>
        <div className="createhr">
          <label>Username: </label> <br />
          <input
            type="text"
            placeholder="user name"
            className="name"
            name="username"
            onChange={onUserInputChange}
          />
          <br />
          <br />
          <label>Password: </label> <br />
          <input
            type="password"
            placeholder="password"
            className="name"
            name="password"
            onChange={onPasswordInputChange}
          />
          {/* <p>{userName}, {password}</p> */}
          <div className="login-button">
            <button onClick={login}>SIGN IN</button>
          </div>
        </div>
      </div>
    </form>
<>

</>
   
    </>
    
  );
}

export default Login;
