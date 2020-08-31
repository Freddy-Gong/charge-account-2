import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import echarts from 'echarts'
import Time from 'Components/TIme'
import { useRecords, Record } from 'Hook/useRecords'
import { defaultDate } from '../NumberPad'
import { useUpdate } from 'Hook/useUpdate'


const Chart = styled.div`
    width:100%;
    height:400px;
`
type Props = {
    value: '-' | '+'
}

const ChartSection: React.FC<Props> = (props) => {
    if (props.value === '-') {
        console.log('支出')
    } else {
        console.log('收入')
    }
    const { records } = useRecords()
    const container = useRef<HTMLDivElement>(null)
    const { MonthNumber, DayNumber, YearNumber } = Time()
    const XArray: string[] = []
    for (let i = 0; i < 8; i++) {
        XArray.push(MonthNumber + '-' + (DayNumber - i))
    }
    const hash: { [key: string]: Partial<Record>[] } = {}
    XArray.forEach((x) => {
        if (!(x in hash)) {
            hash[x] = [defaultDate]
        }
        records.forEach((r) => {
            if (YearNumber + '-' + x === r.date) {
                hash[x].push(r)
            }
        })
    })
    let spending: number[], income: number[], Spending: number[] = [], Income: number[] = []
    const ChartArray = Object.entries(hash)
    ChartArray.map((ca) => {
        spending = [0]
        income = [0]
        ca[1].map((a) => {
            if (a.category === '-' && a.account) {
                spending.push(a.account)
            } if (a.category === '+' && a.account) {
                income.push(a.account)
            }
            return { spending, income }
        })
        Income.push(income.reduce((sum, item) => { return sum + item }, 0))
        Spending.push(spending.reduce((sum, item) => { return sum + item }, 0))
        return { Income, Spending }
    })
    const [option, setOption] = useState({
        tooltip: {},
        xAxis: {
            data: XArray.reverse()
        },
        yAxis: {},
        series: [{
            type: 'bar',
            data: Income.reverse()
        }]
    })
    useUpdate(() => {
        if (container.current) {
            const myEcharts = echarts.init(container.current)
            myEcharts.setOption(option);
        }
    }, [option])
    return (
        <Chart ref={container} />
    )
}
export default ChartSection