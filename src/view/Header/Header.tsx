import React, { useContext } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import { manageContext } from '../NumberPad'
import { useHistory } from 'react-router-dom'
const Wrapper = styled.header`
    padding:10px 0;
    padding-left:0.5em;
    padding-right:0.5em;
    font-size:20px;
    background:#1296db;
    color:white;
    display:flex;
    justify-content:space-between;
    > .icon{
        height:1em;
        width:2em;
    }
`
const Header: React.FC = () => {
    const { manageTag, setManageTag } = useContext(manageContext)
    const Manager = () => {
        if (setManageTag) {
            setManageTag(!manageTag)
        }
    }
    const history = useHistory()
    return (
        <Wrapper>
            <Icon name="Right" onClick={() => history.goBack()} />
            <span>记一笔</span>
            <span onClick={Manager}>管理</span>
        </Wrapper>)
}
export default Header