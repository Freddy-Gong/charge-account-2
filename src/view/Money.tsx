import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
    background:rgb(40,44,52);
    color:rgb(97,218,251);
    height:20%;
    > header {
        display:flex;
        justify-content:space-between;
        padding:10px 10px;
    }
    > main{
        display:flex;
        justify-content:center;
        padding-bottom:30px;
        font-size:20px;
    }
    > footer{
        display:flex;
        justify-content:space-between;
        padding:10px 10px;
    }
`
const IconWrapper = styled.div`
    
`

const Money = () => {
    return (
        <Wrapper>
            <header>
                <span>2020-8</span>
                <span>本月结余</span>
                <span>2020-8</span>
            </header>
            <main>Money</main>
            <footer>
                <span>收入:xxx</span>
                <span>支出:xxx</span>
            </footer>
            <IconWrapper>
                <div></div>
            </IconWrapper>
        </Wrapper>
    )
}

export default Money