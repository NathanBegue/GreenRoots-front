import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../../Auth/authStore";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuthStore();
    const location = useLocation();

    // Si l'utilisateur n'est pas connecté et vient directement via l'URL
    if (!token && location.pathname === "/historique") {
        return <Navigate to="/interdit" replace />;
    }

    return children;
};

export default ProtectedRoute;

