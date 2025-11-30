import React from "react";
import useAuth from "../Hooks/useAuth";
import ScreenLoading from "../Components/Loader/ScreenLoading/ScreenLoading";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return <ScreenLoading></ScreenLoading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children ;
};

export default AdminRouter;
