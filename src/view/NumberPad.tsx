import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import PadSection from './NumberPad/Pad'

const Header = styled.header`
    padding:5px 0;
    padding-left:0.5em;
    padding-right:0.5em;
    background:rgb(97,218,251);
    color:white;
    display:flex;
    justify-content:space-between;
    > .icon{
        height:1em;
        width:2em;
    }
`
const Category = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    > span{
        font-size:16px;
        padding:10px 10px;
        color:#999;
    }
    > .active{
        color:rgb(97,218,251);
        font-size:20px;

    }
`
const Tags = styled.div`
    display:flex;
    flex-wrap:wrap;
`
const TagWrapper = styled.div`
    width:25%;
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    > .icon{
        border:1px solid green;
        border-radius:50px;
        padding:10px;
        height:3.5em;
        width:3.5em;
    }
    > span{
        padding:5px 0px;
    }
`
const Pad = styled.div``

const NumberPad = () => {
    const [active, setActive] = useState(true)
    const Change = () => {
        setActive(!active)
    }
    return (
        <>
            <Header>
                <Icon name="Right" />
                <span>记一笔</span>
                <span>管理</span>
            </Header>
            <Category>
                <span className={active ? 'active' : ''} onClick={Change}>支出</span>
                <span className={active ? '' : 'active'} onClick={Change}>收入</span>
            </Category>
            <Tags>
                <TagWrapper>
                    <Icon name="Food" />
                    <span>餐饮</span>
                </TagWrapper>
                <TagWrapper>
                    <Icon name="Cars" />
                    <span>交通</span>
                </TagWrapper><TagWrapper>
                    <Icon name="Doctor" />
                    <span>医疗</span>
                </TagWrapper><TagWrapper>
                    <Icon name="Education" />
                    <span>教育</span>
                </TagWrapper><TagWrapper>
                    <Icon name="Happy" />
                    <span>娱乐</span>
                </TagWrapper><TagWrapper>
                    <Icon name="Shooping" />
                    <span>购物</span>
                </TagWrapper><TagWrapper>
                    <Icon name="Other" />
                    <span>其他</span>
                </TagWrapper><TagWrapper>
                    <Icon name="Add" />
                    <span>添加</span>
                </TagWrapper>
            </Tags>
            <Pad>
                <PadSection />
            </Pad>
        </>

    )
}
export default NumberPad