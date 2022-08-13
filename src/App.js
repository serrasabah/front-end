import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import NewUser from "./components/NewUser";
import ListJob from "./components/ListJob";
import AddJob from "./components/AddJob";
import ListUsers from "./components/ListUsers";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/NewUser" element={<NewUser />} />
          <Route path="/ListJob" element={<ListJob />} />
          <Route path="/ListUsers" element={<ListUsers />} />
          <Route path="/AddJob" element={<AddJob />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>




  );
}

export default App;


// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
// import AdminPage from "./components/AdminPage";
// import NewUser from "./components/NewUser";
// import ListJob from "./components/ListJob";
// import AddJob from "./components/AddJob";
// import ListUsers from "./components/ListUsers";
// import Login from "./components/Login";
// import { ToastContainer } from "react-toastify";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// //import PrivateRoutes from './components/PrivateRoutes'
// function App() {
//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <BrowserRouter>
//         <Routes>
//           {/* <Route element={<PrivateRoutes />}>
//             <Route element={<AdminPage />} path="/AdminPage" exact />
//             <Route element={<ListJob />} path="/ListJob" />
//             <Route path="/NewUser" element={<NewUser />} />
//             <Route path="/ListUsers" element={<ListUsers />} />
//             <Route path="/AddJob" element={<AddJob />} />
//             <Route path="/" element={<AdminPage />} /> 
//           </Route>
//           <Route element={<Login />} path="/Login" /> */}
//           <Route path="/Login" component={Login} />
//           <Route path="/AdminPage" element={<AdminPage />} />
//           <Route path="/NewUser" element={<NewUser />} />
//           <Route path="/ListJob" element={<ListJob />} />
//           <Route path="/ListUsers" element={<ListUsers />} />
//           <Route path="/AddJob" element={<AddJob />} />
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </>




//   );
// }

// export default App;
