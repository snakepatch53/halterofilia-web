import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { es } from "date-fns/locale";
import { format } from "date-fns";

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

export function getValueFromObject(data, name) {
    let value = data[name];
    if (name.includes(".")) {
        const keys = name.split(".");
        value = data;
        keys.forEach((key) => {
            if (value) value = value[key];
        });
    }
    return value;
}

export function formatDate(value, formatStr = "dd 'de' MMMM 'de' yyyy") {
    return format(new Date(value), formatStr, {
        locale: es,
    });
}
