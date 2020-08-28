import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import echarts from 'echarts'
import Time from 'Components/TIme'
const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:5px 0;
    > div{
        display:flex;
        flex-direction:row;
        > span{
            display:flex;
            justify-content:center;
            width:2em;
            padding:3px 0px;
        }
    }
    > .icon{
        height:1em;
    }
    > .time{
        border:2px solid rgb(97,218,251);
        border-radius:5px;
        > span:first-child{
            color:rgb(97,218,251);
        }
        > span:last-child{
            background:rgb(97,218,251);
            color:white;
        }
    }
    
`
const ChartSection = styled.div`
    width:100%;
    height:400px;
`

const Chart = () => {
    const container = useRef<HTMLDivElement>(null)
    const { MonthAndDay } = Time()
    const option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    useEffect(() => {
        if (container.current) {
            const myEcharts = echarts.init(container.current)
            myEcharts.setOption(option);
        }
    }, [option])



    return (
        <>
            <Header>
                <div className="time">
                    <span>月</span>
                    <span>日</span>
                </div>
                <Icon name="RightCopy" />
                <div>{MonthAndDay}</div>
                <Icon name="Left" />
                <div className="category">
                    <span>支出</span>
                    <span>收入</span>
                </div>
            </Header>
            <ChartSection ref={container} />
        </>
    )
}
export default Chart
