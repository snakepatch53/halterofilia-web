import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { cls } from "../common/utils";

export default function Header() {
    return (
        <header className=" parent sticky top-0 z-10 h-[--header-height] bg-[--c2] ">
            <div className="container flex h-full ">
                <Link to="/" className=" relative flex items-center h-full bg-[--c3]  ">
                    <div className=" absolute top-0 -left-full z-10 w-full h-full bg-[--c3] " />
                    <img className=" h-full aspect-square object-contain p-3 " src="./logo.png" alt="Logo de Ideasoft" />
                    <div className=" flex flex-col ">
                        <h1 className=" text-2xl font-bold uppercase leading-5 font-custom1 text-[--c1] tracking-wider ">Ideasoft</h1>
                        <h2 className=" text-lg opacity-80 uppercase leading-5 font-custom1 ">Halterofilia</h2>
                    </div>
                </Link>

                <nav className=" flex-1 flex justify-end items-center gap-4 h-full ">
                    <div className=" h-full w-24 bg-gradient-to-tr from-[--c3] from-50% to-[--c2] to-50% mr-auto " />
                    <Option name="Inicio" to="/" />
                    <Option name="Competencias" to="/competitions" />
                    <Option name="About" to="/about" />
                    <Option name="Contacto" to="/contact" />
                </nav>
            </div>
        </header>
    );
}

function Option({ name = "", to = "#" }) {
    const className = " absolute top-0 -bottom-full group-hover:bottom-0 -z-10 opacity-0 group-hover:opacity-100 m-auto transition-all text-[--c1] ";
    return (
        <Link to={to} className=" relative group flex items-center text-xl uppercase leading-6 font-custom1 text-[--c3] ">
            <FontAwesomeIcon className={cls(className, "  left-0 group-hover:-left-3.5  ")} icon={faDumbbell} />
            <span className=" text-lg bg-[--c2] px-0.5 group-hover:text-[--c1] transition-all ">{name}</span>
            <FontAwesomeIcon className={cls(className, " right-0 group-hover:-right-3.5 ")} icon={faDumbbell} />
        </Link>
    );
}
