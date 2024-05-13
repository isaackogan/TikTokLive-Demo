import {ROOM_DATA, SOCKET, SocketContext} from "../socket";
import ChatBox from "./chat/ChatBox";
import {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {createTheme, ThemeProvider} from "@mui/material";
import GridLayout from "./grid/GridLayout";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#39cce0'
        },
    }
});

export default function App() {

    const [roomData, setRoomData] = useState(ROOM_DATA);

    const handleRoomData = useCallback((event: CustomEvent) => {
        setRoomData(event.detail);
    }, [roomData]);

    useEffect(() => {
        document.addEventListener("RoomData", handleRoomData);
        return () => {
            document.removeEventListener("RoomData", handleRoomData);
        }
    })

    return (
        <SocketContext.Provider value={SOCKET}>
            <ThemeProvider theme={theme}>
                <Container>
                    <GridLayout/>
                    <ChatBox/>
                </Container>
            </ThemeProvider>
        </SocketContext.Provider>
    )
}