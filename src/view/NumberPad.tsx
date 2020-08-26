import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import PadSection from './NumberPad/Pad'
import TagsSection from './Tags/Tags'
import Category from './Category/Category'

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




const NumberPad = () => {
    const [mangeTag, setMangeTag] = useState(false)
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
            <Category />
            <TagsSection manage={mangeTag} />
            <PadSection />
        </>

    )
}
export default NumberPad