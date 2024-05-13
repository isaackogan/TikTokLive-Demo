import {io, Socket} from "socket.io-client";
import {Context, createContext} from "react";
import {ConnectEvent} from "./@types/TikTokLive";


export const SOCKET = io("http://localhost:7777", {
    path: '/ws/ws',
    query: {'unique_id': 'dillonensor'},
    transports: ['websocket'],
    upgrade: false
});

export const ROOM_DATA: Partial<ConnectEvent> = {unique_id: undefined, room_id: undefined}

SOCKET.on("ConnectEvent", (event: ConnectEvent) => {
    ROOM_DATA.unique_id = event.unique_id;
    ROOM_DATA.room_id = event.room_id;
    document.dispatchEvent(new CustomEvent("RoomData", {detail: ROOM_DATA}));
})

SOCKET.on("disconnect", (reason, description) => {
    alert("Disconnected. See reason in console.");
    console.log(reason, description);
})

export const SocketContext: Context<Socket | undefined> = createContext(undefined);
