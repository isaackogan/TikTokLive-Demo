import styled from "styled-components";
import {MutableRefObject, useCallback, useContext, useEffect, useRef, useState} from "react";
import Chat from "./Chat";
import {SocketContext} from "../../socket";
import {CommentEvent} from "@tiktoklive/types";

const Container = styled.div`
  padding: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 20px;
`;


export default function () {

    const socket = useContext(SocketContext);
    const [chats, setChats] = useState([]);
    const containerRef: MutableRefObject<any> = useRef(null);
    const isAtBottomRef = useRef(true);

    if (!socket) {
        return (
            <Container>
                Not Connected!
            </Container>
        )
    }


    // Handle chats
    const handleChat = useCallback((event: CommentEvent) => {

        setChats([
            <Chat
                data={event}
                key={"message-" + Math.random()}
            />,
            ...chats
        ]);
    }, [chats]);

    useEffect(() => {
        socket.on("CommentEvent", handleChat);

        return () => {
            socket.off("CommentEvent", handleChat)
        }

    }, [handleChat]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            isAtBottomRef.current = container.scrollHeight - container.scrollTop - container.clientHeight <= 10;
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Auto-scroll if at bottom
    useEffect(() => {
        if (isAtBottomRef.current) {
            const container = containerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [chats]);

    return (
        <Container ref={containerRef}>
            {chats}
        </Container>
    )
}