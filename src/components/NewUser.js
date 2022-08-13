import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useGridApiContext } from "@mui/x-data-grid";
import { UserApi } from "./UserApi";
import { toast } from "react-toastify";

const userApi = new UserApi();
function NewUser() {
  
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();

  function onFormInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    console.log(field);
    newState[field] = value;
    console.log(newState);
    setFormState(newState);
  }

  async function addUsers(formState) {
    const response = await userApi.addUsers(formState);
    const messageResponse = response.data;
     if (messageResponse.responseType === "SUCCESS") {
       toast.success(messageResponse.message);
   }
   else{
    toast.error(messageResponse.message);
   }
  }

  function createUser(e) {
    e.preventDefault();
    addUsers(formState);
    navigate("/ListUsers");
  }

  return (
    <div className="Form">
      <div className="sub-main">
        <h2>New User</h2>
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
          <br />
          <br />
          <label>Roles: </label> <br />
          <label>
            <input
              type="checkbox"
              name="role"
              value="admin"
            onChange={onFormInputChange}
            />
            Admin
          </label>
          <label>
            <input
              type="checkbox"
              name="role"
              value="user"
            onChange={onFormInputChange}
            />
            User
          </label>
        </div>
        <div className="create-button">
          <button onClick={createUser}>CREATE</button>
        </div>
      </div>
    </div>
  );
}

export default NewUser;

