import { useState } from "react";
import { logout } from "../services/authService";
import { cls } from "../common/utils";
export default function Header() {
    return (
        <div className=" sticky top-0 h-[--panel-header-height] p-4 ">
            <div className=" flex items-center justify-end w-full h-full p-4 bg-black/10 text-white  rounded-xl ">
                <ProfileButton />
            </div>
        </div>
    );
}

function ProfileButton() {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);
    return (
        <div className=" relative h-full ">
            <button className=" flex h-full " onClick={toggle}>
                <img className=" h-full aspect-square object-cover bg-white rounded-full " src="/user.png" alt="Foto de usuario anonimo" />
            </button>
            <div
                className={cls(
                    " absolute -right-4 top-[calc(100%+30px)] flex flex-col gap-4 w-screen max-w-80 max-h-96 p-4 rounded-xl bg-black/10 transition-all ",
                    {
                        " max-h-0 p-0 overflow-hidden opacity-0 ": !open,
                    }
                )}
            >
                <div className=" absolute -top-2 right-6 w-0 h-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-l-transparent border-b-black/10 " />
                <button className=" flex items-center gap-2 h-9 ">
                    <img className=" h-full aspect-square object-cover bg-white rounded-full " src="/user.png" alt="Foto de usuario anonimo" />
                    <span className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-lg font-custom1 ">
                        Harold Anderson Hernández Zambrano
                    </span>
                </button>
                <button className=" h-10 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded " onClick={logout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
