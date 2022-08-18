import React, { useState, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { JobApi } from ".../";
import {JobApi} from "../../Api/JobApi"
import { toast } from "react-toastify";


const jobApi = new JobApi();
function AddJob() {

  const [formState, setFormState] = useState({});
  const [username, setUsername] = useState(window.localStorage.getItem("username"));


  function onFormInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[field] = value;
    setFormState(newState);  
  }
  
  async function addJob(formState) {
    const response = await jobApi.addJobs(formState);
    const messageResponse = response.data;
     if (messageResponse.responseType === "SUCCESS") {
       toast.success(messageResponse.message);
   }
   else{
    toast.warning(messageResponse.message);
   }
  }
  
  const navigate = useNavigate();
  function returnListPage(e) {
    e.preventDefault();
    if(!formState.jobName || !formState.URL || !formState.period || !formState.timeout){
      toast.warning("Boş geçilemez");
    }else{
      addJob(formState);
      navigate("/ListJob");
    }
  }

  function returnHomePage(e) {
    e.preventDefault();
    navigate("/ListJob");
  }

  useEffect(() => {
    if(!username){
      navigate("/Login");
    }
}, []);

  return (
    <form className="Form">
      <div className="sub-main">
        <h2>Healthcheck Job</h2>
        <div className="createhr">
          <label>Job Name: </label> <br />
          <input
            type="text"
            placeholder="job name"
            className="name"
            name="jobName"
            onChange={onFormInputChange}
          />
          <br />
          <br />
          <label>Url: </label> <br />
          <input
            type="text"
            placeholder="url name"
            className="name"
            name="URL"
            onChange={onFormInputChange}
          />
          <br />
          <br />
          <label>Check Period: </label> <br />
          <input
            type="text"
            placeholder="period time"
            className="name"
            name="period"
            onChange={onFormInputChange}
          />
          <br />
          <br />
          <label>Request Time-out in ms: </label> <br />
          <input
            type="text"
            placeholder="time-out"
            className="name"
            name="timeout"
            onChange={onFormInputChange}
          />
        </div>
        <div className="home">
          <div className="login-button">
            <button onClick={returnHomePage}>Home</button>{" "}
            <button onClick={returnListPage}>CREATE</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddJob;
