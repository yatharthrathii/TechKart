import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { idToken, authLoaded } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!authLoaded) return null;

  if (!idToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
