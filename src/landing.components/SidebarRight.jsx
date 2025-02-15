import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../common/utils";

export default function SidebarRight({ className = "" }) {
    return (
        <aside className={cls(" pb-5 pr-[var(--container-padding)] ", " hidden ", " lg:block ", className)}>
            <section className=" sticky top-2 ">
                <h4 className=" text-center text-lg font-custom2 font-bold tracking-wide ">Últimos Blogs</h4>
                <section className="  ">
                    <Blog imgSrc="/blogs/blog1.jpg" />
                    <Blog imgSrc="/slider/1.jpg" />
                    <Blog imgSrc="/slider/2.jpg" />
                    <Blog imgSrc="/slider/3.jpg" />
                </section>
            </section>
        </aside>
    );
}

function Blog({ imgSrc = "" }) {
    return (
        <article className=" flex gap-2 w-full aspect-[4/1] h-28 p-3 cursor-pointer ">
            <img className=" h-full aspect-square object-cover object-center rounded-xl " src={imgSrc} alt="Blog 1" />
            <section className=" flex-1 flex flex-col justify-center gap-1 h-full min-w-0 ">
                <h5 className=" font-custom2 font-bold tracking-wide truncate ">Titulo del blog</h5>
                <small className=" flex gap-1 items-center text-xs w-full opacity-60 ">
                    <FontAwesomeIcon className=" text-sm " icon={faCalendar} />
                    <time className=" flex-1 truncate ">14 de febrero del 2025</time>
                </small>
                <p className=" block h-8 text-sm text-ellipsis overflow-hidden leading-4 opacity-70 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corrupti voluptate nostrum doloremque, quis pariatur commodi facere
                    consectetur quibusdam magni est unde voluptatibus vero reiciendis sunt totam, officia ipsa sit.
                </p>
            </section>
        </article>
    );
}
