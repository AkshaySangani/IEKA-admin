import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/auth-store";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({
  children,
}: PublicRouteProps) => {
  const token = useAuthStore((state) => state.token);

  return token ? (
    <Navigate to="/" replace />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;