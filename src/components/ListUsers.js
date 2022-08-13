import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { UserApi } from "./UserApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },

  {
    field: "role",
    headerName: "role",
    width: 80,
  },

];

function ListUsers() {
  const [users, setUsers] = useState([]);

  const userApi = new UserApi();

  async function getUsers() {
    const response = await userApi.getUsers();
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();

  function returnHomePage(e) {
    e.preventDefault();
    navigate("/AdminPage");
  }

  function addUsers(e) {
    e.preventDefault();
    navigate("/NewUser");
  }
  return (
    <Box
      sx={{
        height: "450px",
        width: "60vh",
        margin: "20vh",
        marginLeft: "50vh",
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <div className="create-button">
        <button onClick={returnHomePage}>Home</button>
        <button onClick={addUsers}>Add</button>
      </div>
    </Box>
  );
}
export default ListUsers;
