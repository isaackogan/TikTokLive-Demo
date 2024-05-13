import styled from "styled-components";
import ChatList from "./ChatList";

const Container = styled.div`
  width: 100%;
  max-width: 345px;
  height: 100%;
  background: var(--chat-colour);
  border-left: 1px solid var(--chat-border);
  display: flex;
  flex-direction: column;
`;


const ChatHeader = styled.div`
  border-bottom: 1px solid var(--chat-border);
  font-weight: bold;
  text-align: center;
  padding: 20px;
  font-size: 15px;
`

export default function() {

    return (
        <Container>
            <ChatHeader>
                Comments
            </ChatHeader>
            <ChatList />
        </Container>
    )
}