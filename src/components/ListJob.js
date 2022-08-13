import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { JobApi } from "./JobApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from "react-toastify";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Icon from '@mui/material/Icon';

function ListJob() {
  const [jobs, setJobs] = useState([]);

  const jopApi = new JobApi();
  const [selectionModel, setSelectionModel] = useState();

  async function handleCellChange(params, newValue) {
    const jobIndex = jobs.findIndex(job => {
      return job.id === params.id;
    });
  
    
    const updateJobs = [... jobs];
    updateJobs[jobIndex][params.field] = newValue;
   setJobs(updateJobs)

   const id = params.id;
   console.log(id);
  console.log(jobIndex);
   console.log(updateJobs[jobIndex]);

   const response = await jopApi.updateJob(id,updateJobs[jobIndex]);
   const messageResponse = response.data;

  }  

    async function deleteCell(){
    console.log("id" + selectionModel)
    const selectedIDs = selectionModel;
              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
   // console.log("size" + selectedIDs.size)
   
         const response = await jopApi.deleteJob(selectedIDs);
         const messageResponse = response.data;
         console.log(messageResponse)
     if (messageResponse.responseType === "ERROR") {
      toast.error(messageResponse.message);
       console.log(messageResponse)
   }
   else{
    toast.warning(messageResponse.message);
    console.log(messageResponse)
   }
    
    const newState = [...jobs]  ;
    // const messageResponse = response.data;
   // setJobs((r) => r.filter((x) => !selectedIDs.has(x.id)));
    console.log(jobs);
    console.log(selectedIDs);
}


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "jobName",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "URL",
      headerName: "URL",
      width: 200,
      editable: false,
    },
    {
      field: "period",
      headerName: "period",
      width: 100,
      editable: true,
    },
    {
      field: "timeout",
      headerName: "timeout",
      width: 100,
      editable: true,
    },
    {
      field: "delete",
            width: 75,
            //sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
              return (
                <IconButton
                  onClick={deleteCell}
                >
                  <DeleteIcon />
                </IconButton>
              );
            }
          },
          {
            field: "view",
                  width: 75,
                  //sortable: false,
                  disableColumnMenu: true,
                  renderHeader: () => {
                    return (
                      <IconButton
                        onClick={deleteCell}
                      >
              
                      <EqualizerIcon color="secondary" />
                      </IconButton>
                    );
                  }
                }
  ];
  

  async function getJobs() {
    const response = await jopApi.getJobs();
    setJobs(response.data);
  }

  useEffect(() => {
    getJobs();
   // deleteCell();
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
  return (
    

     <Box
     
       sx={{
         height: "450px",
         width: "120vh",
         margin: "20vh",
         marginLeft: "50vh",
       }}
     >
         <DataGrid
        editMode="row"
        rows={jobs}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        onRowEditStop={(params, event) => handleCellChange(params, event.target.value)}
        // checkboxSelection
        // onSelectionModelChange={(ids) => {
        //   setSelectionModel(ids);
        // }}
       // isRowSelectable={(params) => params.row.id > 18}
       checkboxSelection
        selectionModel={selectionModel}
        hideFooterSelectedRowCount
        onSelectionModelChange={(selection) => {
          if (selection.length > 1) {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter((s) => !selectionSet.has(s));

            setSelectionModel(result);
            console.log(selectionModel);
          } else {
            setSelectionModel(selection);
            console.log(selectionModel);
          }
        }}
      />
       <div className="create-button">
         <button onClick={returnHomePage}>Home</button>
         <button onClick={addJob}>Add</button>
         <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
       </div>
       <div >
         <button onClick={addJob}>delete</button>
       </div>
     </Box>

  );
}
export default ListJob;
