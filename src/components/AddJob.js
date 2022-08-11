import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { JobApi } from "./JobApi";
import { toast } from "react-toastify";

const jobApi = new JobApi();
function AddJob() {
  const [formState, setFormState] = useState({});

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
    // if (messageResponse.responseType === "SUCCESS") {
    //   toast.success(messageResponse.message);
    // }
  }
  const navigate = useNavigate();
  function returnListPage(e) {
    e.preventDefault();
    navigate("/ListJob");
    addJob(formState);
  }
  function returnHomePage(e) {
    e.preventDefault();
    navigate("/AdminPage");
  }

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
          <div className="createJob-button">
            <button onClick={returnHomePage}>Home</button>
            <button onClick={returnListPage}>CREATE</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddJob;
