import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <p className="text-slate-600">Vérification de l'authentification...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

