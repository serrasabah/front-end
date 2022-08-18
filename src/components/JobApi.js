import axios from "axios";

export class JobApi {
  getJobs() {
   // return axios.get("/jobs");
   return axios.get("/jobs/name");
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

  getByIdResult(id){
    return axios.get("/jobs/" + id);
  }

}
