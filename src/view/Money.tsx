import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from 'Components/Icon'
import { useRecords, Record } from 'Hook/useRecords'
import useTags from 'Hook/useTags'
import Time from 'Components/TIme'

const Wrapper = styled.section`
    background:#1296db;
    color:white;
    height:20%;
    > header {
        display:flex;
        justify-content:space-between;
        padding:10px 10px;
        > .in{
            color:#1296db;
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
            color:#1296db;
            display:flex;
            justify-content;center;
            align-item:center;
            flex-direction:column;
            border:2px solid #1296db;
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
        margin-top:15%;
        height:100%;
        overflow:auto;
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
                display:flex;
                justify-content:flex-end;
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
    // useEffect(() => {
    //     if (tags) {
    //         console.log(tags)
    //         console.log(tags[1])
    //         console.log(tags[1] && tags[1].id)
    //     }
    // }, [tags])
    //console.log(tags[1].id) //加上就会报错
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
    const { YearAndMonth, Month } = Time()
    const pen = document.getElementById('pen')
    const recordWrapper = document.getElementById('RecordWrapper')
    let top, height = 0
    const width = document.body.clientWidth
    if (recordWrapper && width > 450) {
        recordWrapper.style.width = "450px"
    }
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
                {array && array.map((a) =>
                    <>
                        <div key={a[0]}>
                            <span className="day">{a[1][0].month !== Month ? a[1][0].month + '月' + a[1][0].day + '号' : a[1][0].day + '号'}</span>
                            <div className='line'></div>
                            <span>{a[1].reduce((sum, item) => {
                                const result = parseFloat(item.category + item.account.toString())
                                return sum + result
                            }, 0)}</span>
                        </div>
                        {a[1].map((a) => {
                            if (a.category === '-' && tags && tags[0]) {

                                return <div key={a.creatAt}>
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
                                return <div key={a.creatAt}>
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