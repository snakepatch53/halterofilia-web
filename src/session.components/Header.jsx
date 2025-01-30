import { useState } from "react";
import { logout } from "../services/authService";
import { cls } from "../common/utils";
import { useAuthStore } from "../stores/useAuthStore";
import { usePanelStore } from "../stores/usePanelStore";
import Button from "../components/ui/Button";

export default function Header() {
    const HeaderComponent = usePanelStore((state) => state.headerComponent);

    return (
        <div className=" sticky z-10 top-0 h-[--panel-header-height] p-4 pb-0 ">
            <div className=" relative flex items-center gap-2 w-full h-full p-4 pl-[73px] md:pl-4 text-white ">
                <div className=" absolute -z-10 inset-0 bg-black/10 backdrop-blur-sm   rounded-xl " />
                <HeaderComponent />
                <ProfileButton />
            </div>
        </div>
    );
}

function ProfileButton() {
    const user = useAuthStore((state) => state.user);
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);
    return (
        <div className=" relative h-full ml-auto ">
            <button className=" flex items-center h-full " onClick={toggle}>
                <img className=" h-full max-h-10 aspect-square object-cover bg-white rounded-full " src="/user.png" alt="Foto de usuario anonimo" />
            </button>
            <div
                className={cls(
                    " absolute z-20 -right-4 top-[calc(100%+30px)] flex flex-col gap-4 w-screen max-w-80 max-h-96 bg-black/10 backdrop-blur-sm p-4 rounded-xl transition-all ",
                    {
                        " max-h-0 p-0 overflow-hidden opacity-0 ": !open,
                    }
                )}
            >
                <div className=" absolute -top-2 right-6 w-0 h-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-l-transparent border-b-black/10 " />
                <button className=" flex items-center gap-2 h-9 ">
                    <img className=" h-full aspect-square object-cover bg-white rounded-full " src="/user.png" alt="Foto de usuario anonimo" />
                    <span className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-lg font-custom2 text-left ">{user.name}</span>
                </button>
                <Button onClick={logout} label="Cerrar sesión" />
            </div>
        </div>
    );
}
