import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className=" parent bg-[--c2] text-[--c3] text-center py-10 ">
            <div className=" container ">
                <h2 className=" text-2xl font-bold mb-2 text-[--c1] ">Contáctanos</h2>
                <div className=" flex items-center justify-between w-full max-w-96 px-4 py-2 mb-5 mx-auto bg-white rounded-md border border-[#21b859] ">
                    <input
                        type="text"
                        placeholder="¿Tienes alguna duda? Escríbenos aquí..."
                        className=" flex-1 bg-transparent text-black rounded-md outline-none "
                    />
                    <FontAwesomeIcon className=" text-[#21b859] text-xl " icon={faWhatsapp} />
                </div>
                <p>
                    Desarrollado e implementado por <Link className=" font-bold hover:underline ">Ideasoft</Link>. Todos los derechos reservados
                    &copy; 2025
                </p>
            </div>
        </footer>
    );
}
