import styled from "styled-components";
import {Button, TextField} from "@mui/material";

const Container = styled.div`
  font-weight: bold;
  width: 100%;
`;

const Title = styled.h1`
  margin-top: -10px;
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 45px;
`;

const Description = styled.span`
  font-weight: normal;
  align-items: center;
`;

const Link = styled.a`
  color: #a7abde;

  &:hover {
    color: #6b6e9a;
  }
`;

const Code = styled.span`
  background: #1d1d25;
  padding: 4px;
  border-radius: 5px;
  color: #5ddef0;
`;

export default function () {
    return (
        <Container>
            <Title>TikTokLive Demo</Title>
            <Description>
                For enterprise solutions, contact&nbsp;<Code>info@eulerstream.com</Code>.<br/><br/>
                <Button variant="contained" style={{padding: '7px 16px', marginTop: "-2px"}}>Connect</Button>
                &nbsp;to&nbsp;
                <TextField

                    id="filled-basic"
                    label="A TikTok LIVE account"
                    variant={"outlined" as any}
                    placeholder={"@isaackogz"}
                    size={"small"}
                    style={{
                        width: '191px', marginTop: "-2px"
                    }}

                />&nbsp;with their <Code>@username</Code>.

            </Description>
        </Container>
    )
}