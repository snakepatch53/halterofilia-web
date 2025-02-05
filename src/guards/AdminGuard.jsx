import { Navigate, Outlet } from "react-router-dom";
import { ROUTES_SESSION, USER_ROLES } from "../common/constants";
import { useAuthStore } from "../stores/useAuthStore";

export default function AdminGuard() {
    const { user } = useAuthStore((state) => state);
    if (user?.role === USER_ROLES.ADMIN) return <Outlet />;
    return <Navigate replace to={ROUTES_SESSION.BASE + ROUTES_SESSION.HOME} />;
}

export function AdminOptions({ children }) {
    const { user } = useAuthStore((state) => state);
    if (user?.role == USER_ROLES.ADMIN) return children;
    return null;
}
