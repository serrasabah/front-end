import axios from "axios";

export class UserApi {
  getUsers() {
    return axios.get("/user");
  }

  // addUsers(formState) {
  //   return axios.post("/user", formState);
  // }
}
