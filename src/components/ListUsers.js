import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { UserApi } from "../../Api/UserApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from "react-toastify";



function ListUsers() {
  const [users, setUsers] = useState([]);
  const [selectionModel, setSelectionModel] = useState();
  const userApi = new UserApi();
  const [username, setUsername] = useState(window.localStorage.getItem("username"));

  useEffect(() => {
    if(!username){
      navigate("/Login");
    }else{
    getUsers();
    }
  }, []);

  const columns = [
    {
    field: "id",
    headerName: "ID",
    width: 100,
    editable: false,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    editable: true,
  },

  {
    field: "role",
    headerName: "role",
    width: 80,
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

];

  async function getUsers() {
    const response = await userApi.getUsers();
    setUsers(response.data);
  }

  async function handleCellChange(params, newValue) {
    const usersIndex = users.findIndex(user => {
      return user.id === params.id;
    });
  
    console.log(usersIndex)
    
    const updateusers = [... users];
    updateusers[usersIndex][params.field] = newValue;
    setUsers(updateusers)

   const id = params.id;

   const response = await userApi.updateUsers(id,updateusers[usersIndex]);
   const messageResponse = response.data;


  }  

  async function deleteCell(){
    console.log("id" + selectionModel)
    
              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
   // console.log("size" + selectedIDs.size)
   if(selectionModel === undefined){
    toast.error("Please select id");
  }else{
    const selectedIDs = selectionModel;
    const response = await userApi.deleteUser(selectedIDs);
    const messageResponse = response.data;
    console.log(messageResponse)
if (messageResponse.responseType === "SUCCESS") {
 toast.success(messageResponse.message);
 setUsers((r) => r.filter((x) => !x.id===selectedIDs));
 getUsers();
  console.log(messageResponse)
}
else{
toast.error(messageResponse.message);
console.log(messageResponse)
}
  }

    
  //  const newState = [...jobs]  ;
 /// const messageResponse = response.data;
 
  //   console.log(jobs);
  //   console.log(selectedIDs);
   
}



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
         width: "65vh",
        margin: "20vh",
        marginLeft: "70vh",
        boxShadow: "4px 5px 6px 7px rgb(138, 138, 138)",
        borderRadius: "10px",
      }}
    >
      <DataGrid
       editMode="row"
       rows={users}
       columns={columns}
       experimentalFeatures={{ newEditingApi: true }}
       onRowEditStop={(params, event) => handleCellChange(params, event.target.value)}
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
        <button onClick={returnHomePage}>Home</button>{" " + " "}
        <button onClick={addUsers}>Add</button>
      </div>
    </Box>
  );
}
export default ListUsers;
