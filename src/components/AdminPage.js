// import { Navigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useLocation} from 'react-router-dom';


function AdminPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(window.localStorage.getItem("username"));



console.log(username);
  function createUser(e) {
    e.preventDefault();
    navigate("/ListUsers");
  }


  function listJob(e) {
    e.preventDefault();
    navigate("/ListJob");
  }

  function logout(e){
    e.preventDefault();
    window.localStorage.clear();
    navigate("/Login");
  }
  useEffect(() => {
    if(!username){
      navigate("/Login");
    }
}, []);
  

  return (
    <form className="Form">
      <div className="sub-main">
        <div className="createhr">
          {/* <h2>Merhaba {location.state.name}</h2> */}
          <h2>Merhaba {username} </h2> 
          <div className="admin-button">
           
            <button onClick={createUser}>Users</button>
            <br /> <br />
            <button onClick={listJob}>List Job</button> <br /> <br />
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminPage;
