import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cls(...clases) {
    return twMerge(clsx(...clases));
}

export function safeParseJSON(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        e;
        return null; // O puedes devolver un valor por defecto como `undefined` si prefieres
    }
}
