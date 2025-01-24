import { io } from "socket.io-client";

const isProduction = import.meta.env.MODE == "production";
const SOCKET_URL = isProduction ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_LOCAL;

let socket;

export function connectSocket(onConnect, onDisconnect) {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"], // Opcional: asegura que se use WebSocket directamente
        });

        socket.on("connect", () => {
            if (onConnect) onConnect(socket);
            // console.log("Conectado al socket");
        });

        socket.on("disconnect", () => {
            if (onDisconnect) onDisconnect(socket);
            // console.log("Desconectado del socket");
        });
    }
    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

export function listenToEvent(eventName, callback) {
    if (socket) {
        socket.on(eventName, callback);
    }
}

export function emitEvent(eventName, data) {
    if (socket) {
        socket.emit(eventName, data);
    }
}
