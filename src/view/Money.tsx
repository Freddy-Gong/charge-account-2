import React from 'react'
import styled from 'styled-components'

require('icon/Money.svg')


const Wrapper = styled.section`
    background:rgb(40,44,52);
    color:rgb(97,218,251);
    height:20%;
    > header {
        display:flex;
        justify-content:space-between;
        padding:10px 10px;
        > .in{
            color:rgb(40,44,52);
        }
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
    position:relative;
    > div{
        background:white;
        left:50%;
        top:-50px;
        transform:translate(-50%);
        position:absolute;
        border-radius:60px;
        > div{
            color:rgb(97,218,251);
            display:flex;
            justify-content;center;
            align-item:center;
            flex-direction:column;
            border:2px solid rgb(97,218,251);
            margin:10px;
            border-radius:60px;
            padding:10px 24px;
            > span{
                margin:5px 0;
            }
        }
    }
`

const Money = () => {
    return (
        <>
            <Wrapper>
                <header>
                    <span>2020-8</span>
                    <span>本月结余</span>
                    <span className="in">2020-8</span>
                </header>
                <main>Money</main>
                <footer>
                    <span>收入:xxx</span>
                    <span>支出:xxx</span>
                </footer>
            </Wrapper >
            <IconWrapper>
                <div>
                    <div>
                        <svg className="icon">
                            <use xlinkHref="#Money" />
                        </svg>
                        <span>记一笔</span>
                    </div>
                </div>
            </IconWrapper>
        </>
    )
}


export default Money