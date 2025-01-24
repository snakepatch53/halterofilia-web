import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
// import { SessionContext } from "../contexts/session";
// import Loading from "../pages/Loading";

export default function AuthGuard() {
    const isLogged = useAuthStore((state) => state.isLogged);
    // if (isLogged == null) return <Loading />;
    if (isLogged) return <Outlet />;
    return <Navigate replace to="/login" />;
    // return <Outlet />;
}
