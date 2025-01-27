import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../common/utils";

export default function Search({ classWrap = "", placeholder = "Buscar", ...props }) {
    return (
        <div className={cls(" flex items-center h-full max-w-96 px-5 bg-black/10 text-[--c4-txt] rounded-xl ", classWrap)}>
            <input type="text" placeholder={placeholder} className=" w-full bg-transparent " {...props} />
            <FontAwesomeIcon className=" opacity-70 " icon={faSearch} />
        </div>
    );
}
