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

export function searchInArray(data, value) {
    return data.filter((item) => existInRow(item, value));
}

function existInRow(row, value) {
    if (!row) return false;
    const keys = Object.keys(row);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const item = row[key];
        if (typeof item === "object") {
            if (existInRow(item, value)) return true;
        } else if (typeof item === "string" && item.toLowerCase().includes(value.toLowerCase())) return true;
    }
    return false;
}
