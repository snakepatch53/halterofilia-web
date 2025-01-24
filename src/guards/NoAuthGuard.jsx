import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function NoAuthGuard() {
    const isLogged = useAuthStore((state) => state.isLogged);
    // const { session } = useContext(SessionContext);
    // if (session == null) return <Loading />;
    // if (!session?.id) return <Outlet />;
    // return <Navigate replace to="/panel" />;
    // return <Outlet />;
    if (!isLogged) return <Outlet />;
    return <Navigate replace to="/panel" />;
}
