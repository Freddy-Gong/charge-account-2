import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import PadSection from './NumberPad/Pad'
import TagsSection from './Tags/Tags'

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



const NumberPad = () => {
    const [active, setActive] = useState(true)
    const [mangeTag, setMangeTag] = useState(false)
    const Change = () => {
        setActive(!active)
    }
    const Manager = () => {
        setMangeTag(!mangeTag)
    }
    return (
        <>
            <Header>
                <Icon name="Right" />
                <span>记一笔</span>
                <span onClick={Manager}>管理</span>
            </Header>
            <Category>
                <span className={active ? 'active' : ''} onClick={Change}>支出</span>
                <span className={active ? '' : 'active'} onClick={Change}>收入</span>
            </Category>
            <TagsSection manage={mangeTag} />
            <PadSection />
        </>

    )
}
export default NumberPad