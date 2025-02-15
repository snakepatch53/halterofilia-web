import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../common/utils";
import { usePanelStore } from "../../stores/usePanelStore";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function DarkModeButton({ className = "" }) {
    const { darkMode, toggleDarkMode } = usePanelStore((state) => state);
    return (
        <button
            className={cls(" flex items-center p-1 bg-gray-300 dark:bg-black/50 rounded-full transition-all cursor-pointer ", className)}
            onClick={toggleDarkMode}
        >
            <DarkModeOption icon={faSun} isActive={!darkMode} label="Light" />
            <DarkModeOption icon={faMoon} isActive={darkMode} label="Dark" />
        </button>
    );
}

function DarkModeOption({ icon, isActive, label }) {
    return (
        <div
            className={cls(
                " flex-1 flex items-center justify-center gap-0.5 py-1 px-1.5 opacity-60 rounded-full text-xs text-c2-txt dark:text-dark-c2-txt  transition-all ",
                {
                    " bg-c1 text-c1-txt opacity-90 ": isActive,
                }
            )}
        >
            <FontAwesomeIcon icon={icon} />
            <span
                className={cls(" max-w-20 max-h-10 opacity-100 overflow-hidden text-c2-txt dark:text-dark-c2-txt transition-all ", {
                    " text-c1-txt ": isActive,
                })}
            >
                {label}
            </span>
        </div>
    );
}
