import styled from 'styled-components'

const TagWrapper = styled.div`
    width:20%;
    padding:5px 5px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
    > .icon{
        border-radius:50px;
        padding:10px;
        height:3.5em;
        width:3.5em;
    }
    > .delete{
        display:none;
    }
    > .deleteActive{
        display:block;
        position:absolute;
        top:-8px;
        right:0;
        width:2em;
    }
    > span{
        padding:5px 0px;
    }
`
export default TagWrapper