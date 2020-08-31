import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from 'Components/Icon'
import { useRecords, Record } from 'Hook/useRecords'
import useTags from 'Hook/useTags'
import Time from 'Components/TIme'
import createKey from 'lib/CreateKey'

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
const RecordWrapper = styled.div`
    position:absolute;
    width:100%;
    overflow:scroll;
    > div{
        display:flex;
        justify-content:center;
        align-items:center;
        padding:5px 0px;
        > .line{
            width:5px;
            height:5px;
            background:rgb(40,44,52);
            border-radius:5px;
        }
        .day{
            display:flex;
            justify-content:flex-end;
        }
        > span{
            padding:10px;
            width:4em;
            height:100%
        }
        > span:nth-child(2){
            display:flex;
            justify-content:flex-end;
        }
        > span:first-child{
            width:8em;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
        > span:last-child{
            width:8em;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
    }
    
`


const Money = () => {
    const { records, array } = useRecords()
    const { tags } = useTags()
    useEffect(() => {
        if (tags) {
            console.log(tags)
            console.log(tags[1])
            console.log(tags[1] && tags[1].id)
        }
    }, [tags])

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
    const { YearAndMonth } = Time()
    const pen = document.getElementById('pen')
    const recordWrapper = document.getElementById('RecordWrapper')
    let top, height = 0
    if (pen) {
        top = pen.getClientRects()[0].top
        height = pen.getClientRects()[0].height
    }
    if (recordWrapper && top && height) {
        recordWrapper.style.top = top + height + 'px'
        recordWrapper.style.height = document.body.clientHeight - top - height + 'px'
    }

    return (
        <>
            <Wrapper>
                <header>
                    <span>{YearAndMonth}</span>
                    <span>本月结余</span>
                    <span className="in">{YearAndMonth}</span>
                </header>
                <main>{restMoney}</main>
                <footer>
                    <span>收入:{incomeMoney}</span>
                    <span>支出:{spendingMoney}</span>
                </footer>
            </Wrapper >
            <IconWrapper>
                <div id="pen">
                    <Link to="/number">
                        <Icon name="Money" />
                        <span>记一笔</span>
                    </Link>
                </div>
            </IconWrapper>
            <RecordWrapper id="RecordWrapper">
                {array.map((a) =>
                    <>
                        <div key={a[0]}>
                            <span className="day">{a[1][0].day + '日'}</span>
                            <div className='line'></div>
                            <span>{a[1].reduce((sum, item) => {
                                const result = parseFloat(item.category + item.account.toString())
                                return sum + result
                            }, 0)}</span>
                        </div>
                        {a[1].map((a) => {
                            if (a.category === '-' && tags && tags[0]) {
                                return <div key={createKey()}>
                                    <span >{a.note}</span>
                                    <span >{tags.filter((t) =>
                                        t.id === a.tagId
                                    )[0].name}</span>
                                    <Icon name={tags.filter((t) =>
                                        t.id === a.tagId
                                    )[0].name} />
                                    <span>{parseFloat(a.category + a.account.toString())}</span>
                                    <span></span>
                                </div>
                            } else {
                                return <div key={createKey()}>
                                    <span></span>
                                    <span>{parseFloat(a.category + a.account.toString())}</span>
                                    <Icon name={tags.filter((t) =>
                                        t.id === a.tagId
                                    )[0].name} />
                                    <span >{tags.filter((t) =>
                                        t.id === a.tagId
                                    )[0].name}</span>
                                    <span >{a.note}</span>
                                </div>
                            }
                        }
                        )}
                    </>
                )}
            </RecordWrapper>
        </>
    )
}


export default Money