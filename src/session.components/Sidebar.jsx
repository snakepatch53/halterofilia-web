import { faBars, faDumbbell, faHome, faMedal, faMoon, faSun, faUsers } from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation } from "react-router-dom";
import { cls } from "../common/utils";
import { usePanelStore } from "../stores/usePanelStore";
import { ROUTES_SESSION } from "../common/constants";
import Button from "../components/ui/Button";
import { AdminOptions } from "../guards/AdminGuard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
    const { openSidebar, toggleSidebar } = usePanelStore((state) => state);

    return (
        <div
            className={cls(
                " fixed h-auto z-20 ",
                " md:sticky top-0 md:z-0 md:h-screen w-[--panel-sidebar-width-min] p-4 pr-0 transition-all duration-200 ",
                {
                    " md:w-[--panel-sidebar-width] ": openSidebar,
                }
            )}
        >
            <div className={cls(" flex flex-col gap-4 w-full h-full p-4 md:bg-black/10 rounded-xl ")}>
                <div className=" flex gap-4 h-12 ">
                    <Button className=" z-10 " onClick={toggleSidebar} icon={faBars} />
                    <h1
                        className={cls(
                            " flex items-center max-w-0 opacity-0 overflow-hidden font-custom1 text-lg text-[--c1] uppercase transition-all ",
                            {
                                " md:max-w-[--panel-sidebar-width] md:opacity-100 ": openSidebar,
                            }
                        )}
                    >
                        Halterofilia
                    </h1>
                </div>

                <div
                    className={cls(
                        " fixed inset-0 flex-1 bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-xl p-5 pt-24 ",
                        " md:static md:p-0 md:bg-transparent md:dark:bg-transparent md:backdrop-blur-0 flex flex-col gap-2 transition-all overflow-hidden ",
                        {
                            " max-h-0 p-0 opacity-0 md:max-h-none md:opacity-100 ": !openSidebar,
                        }
                    )}
                >
                    <Option to={ROUTES_SESSION.HOME} name="Home" icon={faHome} />
                    <AdminOptions>
                        <Option to={ROUTES_SESSION.USERS} name="Usuarios" icon={faUsers} />
                    </AdminOptions>
                    <Option to={ROUTES_SESSION.INSTITUTIONS} name="Gimnasios" icon={faDumbbell} />
                    <Option to={ROUTES_SESSION.CHAMPIONSHIPS} name="Competencias" icon={faMedal} />
                </div>
                <DarkModeButton />
            </div>
        </div>
    );
}

function Option({ to, name, icon }) {
    const open = usePanelStore((state) => state.openSidebar);

    const pathTo = ROUTES_SESSION.BASE + to;
    const { pathname } = useLocation();
    const isActive = pathname === pathTo;

    return (
        <Button
            tag={Link}
            to={pathTo}
            variant="2"
            icon={icon}
            label={name}
            className={cls(" flex-row-reverse justify-end gap-2 w-full h-none text-[--c2-txt] font-custom1 uppercase ", {
                " text-[--c2-txt2] ": isActive,
            })}
            classLabel={cls({
                " flex max-w-[--panel-sidebar-width] opacity-100 overflow-hidden font-custom1 uppercase transition-all ": !open,
            })}
        />
    );
}

function DarkModeButton() {
    const { darkMode, toggleDarkMode, openSidebar } = usePanelStore((state) => state);
    return (
        <button
            className={cls(" fixed bottom-5 left-5 flex items-center p-2 bg-black/10 text-[--c2-txt] rounded-full transition-all ", " md:static ", {
                " p-1.5 ": !openSidebar,
            })}
            onClick={toggleDarkMode}
        >
            <DarkModeOption icon={faSun} isActive={!darkMode} label="Light" />
            <DarkModeOption icon={faMoon} isActive={darkMode} label="Dark" />
        </button>
    );
}

function DarkModeOption({ icon, isActive, label }) {
    const { openSidebar } = usePanelStore((state) => state);
    return (
        <div
            className={cls(" flex-1 flex items-center justify-center gap-1 p-2 text-xs opacity-60 rounded-full transition-all ", "  md:text-sm ", {
                " bg-black/20 opacity-90 ": isActive,
                " md:p-1 md:text-xs ": !openSidebar,
            })}
        >
            <FontAwesomeIcon icon={icon} />
            <span
                className={cls(" max-w-20 max-h-10 opacity-100 overflow-hidden transition-all ", {
                    " md:max-w-0 md:max-h-0 md:opacity-0 ": !openSidebar,
                })}
            >
                {label}
            </span>
        </div>
    );
}
