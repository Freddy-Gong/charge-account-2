import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
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
        > span:first-child{
            color:rgb(97,218,251);
        }
        > span:last-child{
            background:rgb(97,218,251);
            color:white;
        }
    }
    .category{
        border:2px solid rgb(97,218,251);
        width:4em;
        padding:3px 0;
        font-size:16px;
        color:rgb(97,218,251);
        border-radius:5px;
        outline:none;
    }
`


const Chart = () => {
    const { MonthAndDay } = Time();
    const [category, setCategory] = useState<'-' | '+'>('-')
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
                    <span>月</span>
                    <span>日</span>
                </div>
                <Icon name="RightCopy" />
                <div>{MonthAndDay}</div>
                <Icon name="Left" />
                <select className="category" onChange={change}>
                    <option value='-' >支出</option>
                    <option value='+' >收入</option>
                </select>
            </Header>
            <ChartSection value={category} />
        </>
    )
}
export default Chart
