import { cls } from "../common/utils";

export default function CompetitionState({ classWrapp = "" }) {
    return (
        <div className={cls(" flex flex-col justify-center lg:justify-evenly gap-10 w-full h-full p-5 bg-black/10 rounded-xl ", classWrapp)}>
            <div className=" flex justify-center items-center h-20 sm:h-28 lg:h-36 rounded-xl overflow-hidden ">
                <Header time />
            </div>
            <div className=" grid grid-cols-2 text-center text-[#f9010d] text-3xl sm:text-5xl lg:text-6xl ">
                <span>
                    <b className=" text-5xl sm:text-7xl lg:text-8xl ">2</b> Att.
                </span>
                <span>
                    <b className=" text-5xl sm:text7xl lg:text-8xl ">165</b> kg
                </span>
            </div>
            <b className=" w-full lg:w-3/3 mx-auto text-center text-2xl sm:text-4xl lg:text-5xl text-[#ecb522] text-balance uppercase ">
                Harold Anderson Hernández Zambrano
            </b>
            <div className=" grid grid-cols-3 text-center text-3xl sm:text-5xl lg:text-6xl ">
                <b className=" my-auto text-[#ba0a8e] ">#5</b>
                <img className=" m-auto h-8 sm:h-11 lg:h-20 aspect-video object-contain " src="/ecuador.png" alt="Imagen de la bandera de ecuador" />
                <b className=" my-auto text-[#045e14] ">ECU</b>
            </div>
        </div>
    );
}

function Header({ time = false }) {
    if (time) return <b className={" flex items-center h-full bg-[#1c1cc8] text-white px-5 rounded-xl text-5xl sm:text-7xl lg:text-8xl "}>01:00</b>;

    return (
        <>
            <b className=" flex-1 flex justify-center items-center h-full bg-white text-black text-4xl sm:text-6xl lg:text-7xl ">1</b>
            <b className=" flex-1 flex justify-center items-center h-full bg-white text-black text-4xl sm:text-6xl lg:text-7xl border-l-2 border-r-2 border-black/10 ">
                2
            </b>
            <b className=" flex-1 flex justify-center items-center h-full bg-white text-black text-4xl sm:text-6xl lg:text-7xl ">3</b>
        </>
    );
}
