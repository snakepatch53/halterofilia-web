import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cls(...clases) {
    return twMerge(clsx(...clases));
}
