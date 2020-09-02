import React, { useState } from 'react'
import styled from 'styled-components'
import Time from 'Components/TIme'
import ChartSection from './ChartSection'
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
        > span{
            color:rgb(97,218,251);
        }
        > .active{
            background:rgb(97,218,251);
            color:white;
        }
    }
    .category{
        border:2px solid rgb(97,218,251);
        width:4em;
        font-size:16px;
        color:rgb(97,218,251);
        border-radius:5px;
        outline:none;
    }
`

const Chart = () => {
    const { MonthAndDay, Month } = Time();
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
                    <span className={time === 'day' ? 'active' : ''} onClick={() => setTime('day')}>日</span>
                </div>
                <div>{monthOrDayString}</div>
                <select className="category" onChange={change}>
                    <option value='-' >支出</option>
                    <option value='-' >收入</option>
                </select>
            </Header>
            <ChartSection value={category} time={time} monthOrDay={monthOrDay} />
        </>
    )
}
export default Chart
