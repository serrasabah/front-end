import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as React from "react";

function NewUser() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");

  const navigate = useNavigate();

  const [checkedAdmin, setCheckedAdmin] = React.useState(false);
  const [checkedUser, setCheckedUser] = React.useState(false);
  const [error, setError] = useState("");
  //buraa
  const handleChangeAdmin = () => {
    if (checkedAdmin && checkedUser) {
      setError("detais do not match");
    }
  };

  const handleChangeUser = () => {
    setCheckedUser(!checkedUser);
    console.log("User");
  };

  function createUser(e) {
    e.preventDefault();
    // const match = { roles }.toString().split(", ");
    // console.log(match);
    // for (var a in match) {
    //   var variable = match[a];
    //   console.log(" ");
    //   console.log(variable);
    // }

    //SORR!!!!!!!!
    //eğer role kısmında ilk kelime admin ise AdminPage sayfasına yönlendir.
    //eğer role user ise UserPage Sayfasına yönlendir
    navigate("/AdminPage");
  }

  return (
    <form className="Form">
      <div className="sub-main">
        <h2>New User</h2>
        <div className="createhr">
          <label>User Name: </label> <br />
          <input
            type="text"
            placeholder="user name"
            className="name"
            value={userName}
            onChange={(event) => {
              setuserName(event.target.value);
            }}
          />
          <br />
          <br />
          <label>Password: </label> <br />
          <input
            type="password"
            placeholder="password"
            className="name"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          <br />
          <label>Roles: </label> <br />
          <label>
            <input
              type="checkbox"
              checked={checkedAdmin}
              onChange={handleChangeAdmin}
            />
            Admin
          </label>
          <label>
            <input
              type="checkbox"
              checked={checkedUser}
              onChange={handleChangeUser}
            />
            User
          </label>
        </div>
        <div className="create-button">
          <button onClick={createUser}>CREATE</button>
        </div>
      </div>
    </form>
  );
}

export default NewUser;
