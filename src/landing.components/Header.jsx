import DarkModeButton from "./ui/DarkModeButton";
import { useLandingStore } from "../stores/useLandingStore";
import { cls } from "../common/utils";
import LinkLogo from "./ui/LinkLogo";
import { motion } from "framer-motion";

export default function Header({ className = "" }) {
    const { openMenu, toggleMenu } = useLandingStore();
    return (
        <header
            className={cls(
                " parent block py-[var(--container-padding)] shadow-md bg-c4 text-c4-txt lg:dark:bg-dark-c4 lg:dark:text-dark-c4-txt dark:bg-dark-c1  dark:text-dark-c1-txt ",
                " sticky top-0 z-20 ",
                " lg:static lg:z-0 lg:shadow-none ",
                className
            )}
        >
            <section className={cls(" flex-1 flex justify-end items-center h-full ", "  ")}>
                <LinkLogo className={" flex lg:hidden h-[var(--header-height)] mr-auto py-5.5 sm:py-5 md:py-4.5 "} />
                <DarkModeButton className=" hidden lg:flex " />
                {/* <Button className=" block lg:hidden relative z-20 mt-[2px] " onClick={toggleMenu} icon={faBars} /> */}
                <BurgerMenu open={openMenu} toggleMenu={toggleMenu} />
            </section>
        </header>
    );
}

export function BurgerMenu({ open = false, toggleMenu = () => {} }) {
    return (
        <button onClick={toggleMenu} className=" relative w-10 h-8.5 flex flex-col justify-between p-2 cursor-pointer lg:hidden dark:opacity-80 ">
            <BurgerLine animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} />
            <BurgerLine animate={{ opacity: open ? 0 : 1 }} />
            <BurgerLine animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} />
        </button>
    );
}

function BurgerLine({ animate = {} }) {
    return <motion.div className="w-6 h-0.5 bg-c4-txt dark:bg-dark-c4-txt rounded" animate={animate} transition={{ duration: 0.3 }} />;
}
