import styled from "styled-components";
import Hero from "./Hero.js";
import StatBox from "./stats/StatBox";
import TabsWrappedLabel from "../graph/TabsPanel.js";

const Container = styled.div`
  width: 100%;
  padding: 4%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GridRow = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px 0;

`;

export default function () {

    return (
        <Container>
            <Hero/>
            <GridRow>
                <StatBox startValue={-1} endValue={200} label={'Likes'}/>
                <StatBox startValue={-1} endValue={200} label={'Shares'}/>
                <StatBox startValue={-1} endValue={200} label={'Viewers'}/>
                <StatBox startValue={-1} endValue={200} label={'Comments'}/>
                <StatBox startValue={-1} endValue={200} label={'Diamonds'}/>
            </GridRow>
            <TabsWrappedLabel/>
        </Container>
    )


}