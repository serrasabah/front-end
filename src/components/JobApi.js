import axios from "axios";

export class JobApi {
  getJobs() {
    return axios.get("/jobs");
  }

  addJobs(formState) {
    return axios.post("/jobs", formState);
  }

  updateJob(id, newData) {
    return axios.put("/jobs/" + id, newData);
  }

  deleteJob(id) {
    return axios.delete("/jobs/" + id);
  }
}

