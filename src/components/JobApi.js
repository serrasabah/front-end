import axios from "axios";

export class JobApi {
  getJobs() {
    return axios.get("/jobs");
  }

  addJobs(formState) {
    return axios.post("/jobs", formState);
  }
}
