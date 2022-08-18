import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { JobApi } from "../../Api/JobApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from "react-toastify";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Icon from '@mui/material/Icon';
import Chart from "./Chart";


function ListJob() {

  const [jobs, setJobs] = useState([]);

  const jopApi = new JobApi();

  const [selectionModel, setSelectionModel] = useState();
  const navigate = useNavigate();
  const [username, setUsername] = useState(window.localStorage.getItem("username"));
  

  useEffect(() => {
    if(!username){
      navigate("/Login");
    }else{
      getJobs();
    }
  }, []);

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

  async function viewCell(){
    console.log("id" + selectionModel)
    if(selectionModel === undefined){
      toast.error("Please select id");
    }
    else{
      const selectedIDs = selectionModel;

      navigate('/Chart',{state:{id:selectedIDs}});
    }
    
  }

    async function deleteCell(e){
      e.preventDefault();
    console.log("id" + selectionModel)
    
              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
   // console.log("size" + selectedIDs.size)
   if(selectionModel === undefined){
    toast.error("Please select id");
  }else{
   const selectedIDs = selectionModel;
         const response = await jopApi.deleteJob(selectedIDs);
         const messageResponse = response.data;
         if (messageResponse.responseType === "SUCCESS") {
          toast.success(messageResponse.message);
          setJobs((r) => r.filter((x) => !x.id===selectedIDs));
          getJobs();
           console.log(messageResponse)
       }
       else{
        toast.error(messageResponse.message);
        console.log(messageResponse)
       }
  
      }
    
  //   const newState = [...jobs]  ;
  //   // const messageResponse = response.data;
  //  // setJobs((r) => r.filter((x) => !selectedIDs.has(x.id)));
  //   console.log(jobs);
  //   console.log(selectedIDs);
}


  const columns = [

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
                  <DeleteIcon color="secondary" />
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
                        onClick={viewCell}
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
         width: "130vh",
         margin: "20vh",
         marginLeft: "35vh",
         boxShadow: "4px 5px 6px 7px rgb(138, 138, 138)",
        borderRadius: "10px",
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
       <div className="login-button">
         <button onClick={returnHomePage}>Home</button>{" "}
         <button onClick={addJob}>Add</button>
         {/* <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" /> */}
       </div>
     </Box>

  );
}
export default ListJob;
