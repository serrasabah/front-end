import axios from "axios";

export class UserApi {
  getUsers() {
    return axios.get("/user");
  }

  addUsers(formState) {
    return axios.post("/user", formState);
  }

  updateUsers(id, newData) {
    return axios.put("/user/" + id, newData);
  }

  deleteUser(id) {
    return axios.delete("/user/" + id);
  }
}
