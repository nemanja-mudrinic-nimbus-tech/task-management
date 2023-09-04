import React, { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth/useAuth";

type Props = {
  fallback?: string;
  customCondition?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute: FC<Props> = ({
  fallback,
  customCondition = true,
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />;
  }

  if (!customCondition) {
    return <Navigate to={fallback || "/"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
