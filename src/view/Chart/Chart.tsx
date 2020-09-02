import React, { useState } from 'react'
import styled from 'styled-components'
import Time from 'Components/TIme'
import ChartSection from './ChartSection'
import { Select } from 'antd'

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
            width:2.5em;
            padding:3px 0px;
        }
    }
    > .icon{
        height:1em;
    }
    > .time{
        border:1px solid rgb(217,217,217);
        border-radius:2px;
        position:relative;
        > span{
            color:rgb(217,217,217);
        }
        > .active{
            color:rgb(97,218,251);
        }
        > .line{
            background:rgb(217,217,217);
            width:1px;
        }
    }
    .select{
        width:5em;
        color:rgb(97,218,251);
        > span{
            > span{
                position:relative;
                > svg{
                    position:absolute;
                    top:-0.4em;
                    left:0.5em;
                    fill:rgb(97,218,215);
                }
            }
        }
    }
`

const Chart = () => {
    const { MonthAndDay, Month } = Time();
    const { Option } = Select
    const [category, setCategory] = useState<'-' | '+'>('-')
    const [time, setTime] = useState<'day' | 'month'>('day')
    let monthOrDay: string = '', monthOrDayString: string = ''
    if (time === 'day') {
        monthOrDay = MonthAndDay
        monthOrDayString = MonthAndDay + '日'
    } else if (time === 'month') {
        monthOrDay = Month
        monthOrDayString = Month + '月'
    }
    const change = () => {
        if (category === '-') {
            setCategory('+')
        } if (category === '+') {
            setCategory('-')
        }
    }
    return (
        <>
            <Header>
                <div className="time">
                    <span className={time === 'month' ? 'active' : ''} onClick={() => setTime('month')}>月</span>
                    <span className='line'></span>
                    <span className={time === 'day' ? 'active' : ''} onClick={() => setTime('day')}>日</span>
                </div>
                <div>{monthOrDayString}</div>
                <Select defaultValue='-' className="select" onChange={change}>
                    <Option value='-'>支出</Option>
                    <Option value='+'>收入</Option>
                </Select>
            </Header>
            <ChartSection value={category} time={time} monthOrDay={monthOrDay} />
        </>
    )
}
export default Chart
