import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../common/utils";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function Button({
    tag = "button",
    variant = 1,
    className = "",
    classLabel = "",
    classIcon = "",
    icon = null,
    label = null,
    children,
    type = "button",
    ...props
}) {
    const Tag = tag;
    return (
        <Tag
            className={cls(
                " flex gap-1 items-center justify-center h-12 px-4 text-center font-custom2 rounded-xl transition-all duration-200 ",
                {
                    " aspect-square ": !label,
                    " bg-[#3b82f6] text-white opacity-80 hover:opacity-100 tracking-wide ": variant == 1,
                    " gap-2 bg-black/10 hover:bg-black/20 ": variant == 2,
                    " bg-red-400 text-black opacity-80 hover:opacity-100 tracking-wide ": variant == 3,
                    " bg-green-400 text-black opacity-80 hover:opacity-100 tracking-wide ": variant == 4,
                },
                className
            )}
            type={type}
            {...props}
        >
            <span
                className={cls(classLabel, {
                    " hidden ": !label || children,
                })}
            >
                {label}
            </span>
            <FontAwesomeIcon
                className={cls(" text-sm ", classIcon, {
                    " hidden ": !icon || children,
                })}
                icon={icon || faQuestion}
            />
            {children}
        </Tag>
    );
}
