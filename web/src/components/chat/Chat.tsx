import styled from "styled-components";
import {CommentEvent} from "@tiktoklive/types";


const Container = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  padding: 5px 15px;
  font-weight: 500;
  font-size: 13px;
  border-radius: 5px;
  animation: fade-in 150ms;
  
  &:hover {
    background: #2f2f2f;
  }
  
  @keyframes fade-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1;
    }
  }
`;


const Icon = styled.img`
  padding-top: 1px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
`;

const Text = styled.span`
  padding-left: 10px;
`

const Name = styled.a`
  color: #b7b7b7;
  font-weight: bold;
  
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
`;



export default function({data}: { data: CommentEvent }) {

    return (
        <Container>
            <Icon src={data.user.avatar_thumb.url_list[0]} />
            <Text>
                <Name target="_blank" href={`https://www.tiktok.com/@${data.user.display_id}`}>{data.user.nickname}</Name><br/>
                {data.content}
            </Text>
        </Container>
    )
}