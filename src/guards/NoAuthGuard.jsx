import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function NoAuthGuard() {
    // const { session } = useContext(SessionContext);
    // if (session == null) return <Loading />;
    // if (!session?.id) return <Outlet />;
    // return <Navigate replace to="/panel" />;
    const isLogged = useAuthStore((state) => state.isLogged);
    if (!isLogged) return <Outlet />;
    return <Navigate replace to="/panel" />;
}
