import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Verifica si hay token

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
