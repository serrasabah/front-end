import * as React from "react";
import Box from "@mui/material/Box";
import MaterialTable from "material-table";
import { DataGrid } from "@mui/x-data-grid";
import { JobApi } from "./JobApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "jobName",
    headerName: "Name",
    width: 200,
  },
  {
    field: "URL",
    headerName: "URL",
    width: 200,
  },
  {
    field: "period",
    headerName: "period",
    width: 100,
  },
  {
    field: "timeout",
    headerName: "timeout",
    width: 100,
  },
  {
    field: "update",
    headerName: "update",
    width: 60,
  },
  {
    field: "delete",
    headerName: "delete",
    width: 50,
  },
];

function ListJob() {
  const [jobs, setJobs] = useState([]);

  const jopApi = new JobApi();

  async function getJobs() {
    const response = await jopApi.getJobs();
    setJobs(response.data);
  }

  useEffect(() => {
    getJobs();
  }, []);

  const navigate = useNavigate();
  function returnHomePage(e) {
    e.preventDefault();
    navigate("/AdminPage");
  }

  function addJob(e) {
    e.preventDefault();
    navigate("/AddJob");
  }
  console.log(columns.findIndex);
  return (
    // <Box
    //   sx={{
    //     height: "450px",
    //     width: "120vh",
    //     margin: "20vh",
    //     marginLeft: "50vh",
    //   }}
    // >
    //   <DataGrid
    //     rows={jobs}
    //     columns={columns}
    //     pageSize={5}
    //     rowsPerPageOptions={[5]}
    //     checkboxSelection
    //     disableSelectionOnClick
    //   />
    //   <div className="create-button">
    //     <button onClick={returnHomePage}>Home</button>
    //     <button onClick={addJob}>Add</button>
    //   </div>
    // </Box>

    <MaterialTable
      title="User list from API"
      columns={columns}
      data={jobs}
      //  icons={tableIcons}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            handleRowUpdate(newData, oldData, resolve);
          }),
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            handleRowAdd(newData, resolve);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
      }}
    />
  );
}
export default ListJob;
