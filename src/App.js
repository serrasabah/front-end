import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import NewUser from "./components/NewUser";
import ListJob from "./components/ListJob";
import AddJob from "./components/AddJob";
import ListUsers from "./components/ListUsers";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route path="/ListJob" element={<ListJob />} />
        <Route path="/ListUsers" element={<ListUsers />} />
        <Route path="/AddJob" element={<AddJob />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
