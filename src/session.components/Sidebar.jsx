import { faBars, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useLocation } from "react-router-dom";
import { cls } from "../common/utils";
import { usePanelStore } from "../stores/usePanelStore";
import { ROUTES_SESSION } from "../common/constants";

export default function Sidebar() {
    const toggleSidebar = usePanelStore((state) => state.toggleSidebar);
    const open = usePanelStore((state) => state.openSidebar);

    return (
        <div
            className={cls(" sticky top-0 h-screen w-[--panel-sidebar-width] p-4 pr-0 transition-all duration-200 ", {
                " w-[--panel-sidebar-width-min] ": !open,
            })}
        >
            <div className=" flex flex-col gap-2 w-full h-full p-4 bg-black/10 rounded-xl ">
                <div className=" flex gap-4 h-12 mb-3 ">
                    <button className=" h-full aspect-square bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  " onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} className="text-white" />
                    </button>
                    <h1
                        className={cls(
                            " flex items-center max-w-[--panel-sidebar-width] opacity-100 overflow-hidden font-custom1 text-lg text-[--c1] uppercase transition-all ",
                            {
                                " max-w-0 opacity-0 ": !open,
                            }
                        )}
                    >
                        Halterofilia
                    </h1>
                </div>

                <Option to={ROUTES_SESSION.HOME} name="Home" icon={faHome} />
                <Option to={ROUTES_SESSION.USERS} name="Usuarios" icon={faUsers} />
            </div>
        </div>
    );
}

function Option({ to, name, icon }) {
    const open = usePanelStore((state) => state.openSidebar);

    const pathTo = "/panel/" + to;
    const { pathname } = useLocation();
    const isActive = pathname === pathTo;

    return (
        <Link
            to={pathTo}
            className={cls("flex items-center gap-2  w-full h-12 px-4 bg-black/10 hover:bg-black/20 rounded-xl transition-all", {
                " text-[--c1] ": isActive,
            })}
        >
            <FontAwesomeIcon className=" transition " icon={icon} />
            <span
                className={cls(" flex max-w-[--panel-sidebar-width] opacity-100 overflow-hidden font-custom1 uppercase transition-all  ", {
                    " max-w-0 opacity-0 ": !open,
                })}
            >
                {name}
            </span>
        </Link>
    );
}
