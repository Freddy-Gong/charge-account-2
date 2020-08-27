import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from 'Components/Icon'
import { useRecords, Record } from 'Hook/useRecords'


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
        > a{
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
    const { records } = useRecords()
    let income: Record[] = []
    let spending: Record[] = []
    records.map((r) => {
        if (r.category === '+') {
            income.push(r)
        } else {
            spending.push(r)
        }
        return { income, spending }
    })
    const incomeMoney = income.reduce((sum, item) => { return sum + item.account }, 0)
    const spendingMoney = spending.reduce((sum, item) => { return sum + item.account }, 0)
    const restMoney = incomeMoney - spendingMoney
    const date = new Date()
    const Year = date.getFullYear().toString()
    const Month = (date.getMonth() + 1).toString()
    return (
        <>
            <Wrapper>
                <header>
                    <span>{Year + '-' + Month}</span>
                    <span>本月结余</span>
                    <span className="in">{Year + '-' + Month}</span>
                </header>
                <main>{restMoney}</main>
                <footer>
                    <span>收入:{incomeMoney}</span>
                    <span>支出:{spendingMoney}</span>
                </footer>
            </Wrapper >
            <IconWrapper>
                <div>
                    <Link to="/number">
                        <Icon name="Money" />
                        <span>记一笔</span>
                    </Link>
                </div>
            </IconWrapper>

        </>
    )
}


export default Money