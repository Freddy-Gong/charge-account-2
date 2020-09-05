import React from 'react'
import styled from "styled-components";
import { Select } from 'antd'


const HeaderWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:5px 0;
    font-size:16px;
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
type Props = {
    time: 'day' | 'month',
    monthOrDay: string,
    changeTime: (time: 'day' | 'month') => void,
    changeCategory: () => void

}
const Header: React.FC<Props> = (props) => {
    const { Option } = Select

    return (
        <HeaderWrapper>
            <div className="time">
                <span className={props.time === 'month' ? 'active' : ''} onClick={() => props.changeTime('month')}>月</span>
                <span className='line'></span>
                <span className={props.time === 'day' ? 'active' : ''} onClick={() => props.changeTime('day')}>日</span>
            </div>
            <div>{props.monthOrDay}</div>
            <Select defaultValue='-' className="select" onChange={props.changeCategory}>
                <Option value='-'>支出</Option>
                <Option value='+'>收入</Option>
            </Select>
        </HeaderWrapper>
    )
}
export default Header