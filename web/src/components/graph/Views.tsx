import React, {Component} from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import {ApexOptions} from "apexcharts";

const Container = styled.div`

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  padding-right: 10px;
  background: var(--chat-colour);

  & > * {
    margin-top: 0 !important;
  }
`;

type IState = {
    options: Partial<ApexOptions>,
    series: any[]
}


const BackgroundFeatureColor = '#adadad';
const BackgroundLineColour = '#2c2c31';

const ChartOptions: ApexOptions = {
    theme: {
        palette: 'palette2', mode: 'dark',
    },
    xaxis: {
        // Customizing the X-axis
        axisBorder: {
            show: true,
            color: BackgroundFeatureColor, // Blue color for the x-axis line
            height: 1
        },
        axisTicks: {
            color: BackgroundFeatureColor,
        },
        labels: {
            style: {
                colors: BackgroundFeatureColor, // Blue color for the x-axis labels
                fontSize: '12px'
            }
        },

    },
    grid: {
        borderColor: BackgroundLineColour,
    },
    yaxis: {
        // Customizing the Y-axis
        axisBorder: {
            show: true,
            color: BackgroundFeatureColor, // Green color for the y-axis line
        },
        labels: {
            style: {
                colors: BackgroundFeatureColor, // Green color for the y-axis labels
                fontSize: '12px'
            }
        },

    },

    chart: {
        type: "line", zoom: {enabled: false}, toolbar: {show: false}, background: 'var(--chat-colour)',
    },
    stroke: {curve: 'smooth'},

    colors: ['#34b0c5'],

};

class Views extends Component<any, IState> {

    constructor(props) {
        super(props);
        this.state = {
            options: ChartOptions,
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91, 93]
                }
            ]
        };
    }

    render() {
        return (
            <Container>
                <Chart
                    width={'100%'}
                    height={'280px'}
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    style={{marginTop: "4px"}}
                />
            </Container>
        );
    }
}

export default Views;