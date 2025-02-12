import { cls } from "../../common/utils";

export default function TitleEntity({ title = "", label = "", layout = false, className = "" }) {
    return (
        <h3
            className={cls(
                "  text-sm opacity-80 uppercase font-custom2 tracking-wider ",
                {
                    " flex items-center rounded-xl gap-1 bg-black/10 p-6 mb-4 ": layout,
                },
                className
            )}
        >
            <b>{title}: </b> {label}
        </h3>
    );
}
