import { Link } from "react-router-dom";
import { cls } from "../../common/utils";

export default function LinkLogo({ className = "" }) {
    return (
        <Link to="/" className={cls(" flex items-center gap-1 ", className)}>
            <img className=" h-full aspect-square object-contain rounded-full dark:bg-white dark:p-1 " src="/logo.png" alt="Logo de Ideasoft" />
            <div className=" flex flex-col ">
                <h1 className=" text-base sm:text-xl md:text-2xl font-bold uppercase leading-5 font-custom1 tracking-wider ">Ideasoft</h1>
                <h2 className=" text-xs sm:text-base md:text-lg opacity-80 uppercase leading-5 font-custom1 ">Halterofilia</h2>
            </div>
        </Link>
    );
}
