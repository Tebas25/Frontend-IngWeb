import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import HomePage from "../pages/HomePage";
import EmployeePage from "../pages/Employees/EmployeePage";
import AdministrationPage from "../pages/Administration/AdministrationPage";
import ViewEmployee from "../pages/Employees/ViewEmployee.page";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/administration"
        element={
          <ProtectedRoute>
            <AdministrationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view-employee/:Empleado_id"
        element={
          <ProtectedRoute>
            <ViewEmployee />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
