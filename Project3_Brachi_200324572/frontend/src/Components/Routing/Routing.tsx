import { Route, Routes } from "react-router-dom";
import AllAdminVacations from "../Pages/Admin/AllAdminVacations/AllAdminVacation";
import EditVacation from "../Pages/Admin/EditVacation/EditVacation";
import NewVacation from "../Pages/Admin/NewVacation/NewVacation";
import AllUserVacations from "../Pages/User/AllUserVacations/AllUserVacations";
import Login from "../Pages/User/Login/Login";
import Register from "../Pages/User/Register/Register";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* ADMIN */}
        <Route path="/api/addVacation" element={<NewVacation />} />
        <Route path="/api/admin/vacations" element={<AllAdminVacations />} />
        <Route path="/api/update/:id" element={<EditVacation />} />
        {/* USER */}
        <Route path="/api/addUser" element={<Register />} />
        <Route path="/api/user/vacations" element={<AllUserVacations />} />
        <Route path="/api/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Routing;