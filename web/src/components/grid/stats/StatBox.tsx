import styled from "styled-components";
import {useEffect, useState} from "react";

const Container = styled.div`
  background: var(--chat-colour);
  border: 1px solid var(--chat-border);
  border-radius: 5px;
  padding: 5px 15px 15px 15px;
  width: 150px;
  display: inline-block;
  
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Label = styled.div`
  font-size: 20px;
`;

const Value = styled.span`
  font-weight: bold;
  font-size: 35px;
`;

type StatBoxProps = {
    label: string,
    startValue: number,
    endValue: number,
    formatFunction: (val: number) => string
}

function formatNumber(val: number): string {
    if (val < 1) return '-';
    return val.toLocaleString();
}


export default function ({label, startValue, endValue, formatFunction = formatNumber}: StatBoxProps) {

    const [currentValue, setCurrentValue] = useState(startValue);

    useEffect(() => {

        if (startValue < 0) {
            return;
        }

        if (currentValue < endValue) {
            const timerId = setTimeout(() => {
                setCurrentValue(currentValue => currentValue + 1);
            }, 5);

            return () => clearTimeout(timerId);

        }

    })

    return (
        <Container>
            <Value>{formatFunction(currentValue)}</Value>
            <Label>{label}</Label>
        </Container>
    )
}