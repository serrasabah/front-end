// import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  function createUser(e) {
    e.preventDefault();
    // console.log("click");
    navigate("/ListUsers");
  }

  //   function healthCheck(e) {
  //     e.preventDefault();
  //     // console.log("click");
  //     navigate("/HealthCheckJob");
  //   }

  function listJob(e) {
    e.preventDefault();
    // console.log("click");
    navigate("/ListJob");
  }

  //   function timeForm(e) {
  //     e.preventDefault();
  //     // console.log("click");
  //     navigate("/TimeForm");
  //   }

  return (
    <form className="Form">
      <div className="sub-main">
        <div className="createhr">
          <h2>Merhaba Admin: İsim</h2>

          <div className="admin-button">
            <button onClick={createUser}>Users</button>
            <br /> <br />
            {/* <button onClick={"healthCheck"}>List Users</button> <br /> <br /> */}
            {/* <button onClick={"healthCheck"}>Healthcheck Job</button> <br />{" "} */}
            <button onClick={listJob}>List Job</button> <br /> <br />
            {/* // <button onClick={"timeForm"}>Log Time Line Form</button> */}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminPage;
