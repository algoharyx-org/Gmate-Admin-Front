import { Navigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const accessToken = cookie.load("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
