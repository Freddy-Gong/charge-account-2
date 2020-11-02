import React, { useState } from 'react'
import styled from 'styled-components'
import Time from 'Components/TIme'
import ChartSection from './ChartSection'
import { Select } from 'antd'
import Icon from 'Components/Icon'

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:5px 0;
    font-size:16px;
    > .date{
        margin:0 -32px;
    }
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
        margin-left:2px;
        > span{
            color:rgb(217,217,217);
        }
        > .active{
            color:#1296db;
        }
        > .line{
            background:rgb(217,217,217);
            width:1px;
        }
    }
    .select{
        width:5em;
        color:#1296db;
        margin-right:2px;
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
    const [monthAndDay, setMonthAndDay] = useState<string>(MonthAndDay)
    const index = monthAndDay.indexOf('-')
    const [CurrentMonth, setCurrentMonth] = useState<string>(Month)
    const DownDate = () => {
        if (time === 'month') {
            setCurrentMonth((parseInt(CurrentMonth) - 1).toString())
        } else {
            const day = parseInt(monthAndDay.substr(index + 1)) - 1
            if (day < 10 && day > 0) {
                setMonthAndDay(CurrentMonth + '-0' + day)

            } else if (day === 0) {
                setCurrentMonth((parseInt(CurrentMonth) - 1).toString())
                setMonthAndDay(CurrentMonth + '-' + 30)
            } else {
                setMonthAndDay(CurrentMonth + '-' + day)
            }
        }
    }
    const UpDate = () => {
        if (time === 'month') {
            setCurrentMonth((parseInt(CurrentMonth) + 1).toString())
        } else {
            const day = parseInt(monthAndDay.substr(index + 1)) + 1
            if (day < 10) {
                setMonthAndDay(CurrentMonth + '-0' + day)
            } else if (day === 30) {
                setCurrentMonth((parseInt(CurrentMonth) - 1).toString())
                setMonthAndDay(CurrentMonth + '-' + 30)
            } else {
                setMonthAndDay(CurrentMonth + '-' + day)
            }

        }
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
                <Icon name='RightCopy' onClick={DownDate} />
                <div className='date'>{time === 'month' ? CurrentMonth + '月' : monthAndDay}</div>
                <Icon name='Left' onClick={UpDate} />
                <Select defaultValue='-' className="select" onChange={change}>
                    <Option value='-'>支出</Option>
                    <Option value='+'>收入</Option>
                </Select>
            </Header>
            <ChartSection value={category} time={time} monthOrDay={time === 'month' ? CurrentMonth : monthAndDay} currentMonth={CurrentMonth} />
        </>
    )
}
export default Chart
