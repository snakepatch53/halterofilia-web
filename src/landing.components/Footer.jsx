import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { cls } from "../common/utils";

export default function Footer({ className = "" }) {
    return (
        <footer className={cls(" text-center py-10 ", className)}>
            <h2 className=" text-2xl font-bold mb-2 text-c4-txt2 dark:text-dark-c4-txt2 ">Contáctanos</h2>
            <div className=" flex items-center justify-between w-full max-w-96 p-3 mb-5 mx-auto bg-white rounded-md ">
                <input
                    type="text"
                    placeholder="¿Tienes alguna duda? Escríbenos aquí..."
                    className=" flex-1 bg-transparent text-black rounded-md outline-none "
                />
                <FontAwesomeIcon className=" text-[#21b859] text-xl " icon={faWhatsapp} />
            </div>
            <p>
                Desarrollado e implementado por <Link className=" font-bold hover:underline ">Ideasoft</Link>. Todos los derechos reservados &copy;
                2025
            </p>
        </footer>
    );
}
