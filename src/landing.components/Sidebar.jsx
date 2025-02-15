import { faDumbbell, faHome, faMedal } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../common/utils";
import { ROUTES_LANDING } from "../common/constants";
import Button from "../components/ui/Button";
import { useLandingStore } from "../stores/useLandingStore";
import { motion, AnimatePresence } from "framer-motion";
import LinkLogo from "./ui/LinkLogo";
import DarkModeButton from "./ui/DarkModeButton";

export default function Sidebar({ className = "" }) {
    const { openMenu, toggleMenu } = useLandingStore();

    const clases = cls(
        " flex h-dvh flex-col ",
        " fixed inset-0 left-0 z-20 justify-between w-full max-w-64 p-[var(--container-padding)] pt-26 bg-c4 dark:bg-dark-c4  ",
        " lg:sticky lg:top-0 lg:p-0 lg:pb-5 lg:pl-[var(--container-padding)] lg:bg-transparent lg:backdrop-none ",
        className
    );
    return (
        <>
            <AnimatePresence>
                {openMenu && (
                    <>
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className=" fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden "
                            onClick={toggleMenu}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={clases}
                        >
                            <Content />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
            {!openMenu && (
                <section className={cls(clases, "hidden lg:flex")}>
                    <Content />
                </section>
            )}
        </>
    );
}

function Content() {
    return (
        <>
            <LinkLogo className={" hidden lg:flex h-[var(--header-height)] mr-auto py-5.5 sm:py-5 md:py-4.5 "} />
            <nav className="flex-1">
                <Option to={ROUTES_LANDING.HOME} name="Inicio" icon={faHome} />
                <Option to={ROUTES_LANDING.INSTITUTIONS} name="Gimnasios" icon={faDumbbell} />
                <Option to={ROUTES_LANDING.CHAMPIONSHIPS} name="Competencias" icon={faMedal} />
            </nav>
            <section>
                <div className=" flex lg:hidden justify-center items-center font-custom2 tracking-wide gap-2 ">
                    <b>Preferencias: </b>
                    <DarkModeButton className=" flex lg:hidden " />
                </div>
                <img className="w-full max-w-52 aspect-square object-cover rounded-xl" src="/banner1.png" alt="Banner de Ideasoft Halterofilia" />
            </section>
        </>
    );
}

function Option({ to, name, icon }) {
    const pathTo = ROUTES_LANDING.BASE + to;
    const { pathname } = useLocation();
    const isActive = pathname === pathTo;

    return (
        <Button
            tag={Link}
            to={pathTo}
            variant="5"
            icon={icon}
            label={name}
            className={cls(" group/option flex-row-reverse justify-end gap-2 w-full uppercase h-10 dark:opacity-70 ", {
                " dark:opacity-100 ": isActive,
            })}
            classLabel={cls(
                " flex max-w-[var(--panel-sidebar-width)] opacity-100 overflow-hidden font-custom2 font-bold tracking-wide capitalize text-c4-txt dark:text-dark-c4-txt group-hover/option:text-c4-txt2  transition-all ",
                {
                    " text-c4-txt2 dark:text-c4-txt2 ": isActive,
                }
            )}
            classIcon={cls(" text-c4-txt dark:text-dark-c4-txt group-hover/option:text-c4-txt2 ", {
                " text-c4-txt2 dark:text-c4-txt2 ": isActive,
            })}
        />
    );
}
