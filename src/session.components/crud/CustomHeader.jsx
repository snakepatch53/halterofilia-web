import { faCancel, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button";
import Search from "../../components/ui/Search";
import { cls } from "../../common/utils";

export default function CustomHeader({ onClickButton, onSearch, showForm }) {
    return (
        <>
            <Button
                onClick={onClickButton}
                className=" aspect-square sm:aspect-auto uppercase "
                classLabel=" hidden sm:block "
                label={showForm ? "Nuevo" : "Cancelar"}
                icon={showForm ? faPlus : faCancel}
                variant={!showForm ? 3 : 1}
            />
            <Search
                onSearch={onSearch}
                classWrap={cls(" flex-1 mx-auto ", {
                    " hidden ": !showForm,
                })}
            />
        </>
    );
}
