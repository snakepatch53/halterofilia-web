import { logout } from "../services/authService";

export default function Home() {
    return (
        <div className=" min-h-screen flex flex-col items-center justify-center">
            <p className="text-lg">Session HOME</p>
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 " onClick={logout}>
                Cerrar sesión
            </button>
        </div>
    );
}
