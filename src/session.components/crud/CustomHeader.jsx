import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button";
import Search from "../../components/ui/Search";

export default function CustomHeader() {
    return (
        <>
            <Button className=" aspect-square sm:aspect-auto uppercase " classLabel=" hidden sm:block " label="Nuevo" icon={faPlus} />
            <Search classWrap=" flex-1 mx-auto " />
        </>
    );
}
