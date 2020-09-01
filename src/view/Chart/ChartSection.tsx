import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import echarts from 'echarts'
import Time from 'Components/TIme'
import { useRecords, Record } from 'Hook/useRecords'
import { defaultDate } from '../NumberPad'


const Chart = styled.div`
    width:100%;
    height:400px;
`
type Props = {
    value: '-' | '+'
}

const ChartSection: React.FC<Props> = (props) => {
    const { records } = useRecords()
    const container = useRef<HTMLDivElement>(null)
    const { MonthNumber, DayNumber, YearNumber } = Time()
    const XArray: string[] = []
    if (DayNumber < 8) {
        for (let i = 1; i < 9; i++) {
            XArray.push(MonthNumber + '-' + i)
        }
    } else {
        for (let i = 0; i < 8; i++) {
            XArray.push(MonthNumber + '-' + (DayNumber - 7 + i))
        }
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
    console.log(XArray)
    let spending: number[], income: number[]
    const Spending: number[] = [], Income: number[] = []
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
    let option: {}
    if (props.value === '-') {
        option = {
            tooltip: {},
            xAxis: {
                data: XArray
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: Spending
            }]
        }
    } else {
        option = {
            tooltip: {},
            xAxis: {
                data: XArray
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: Income
            }]
        }
    }
    useEffect(() => {
        if (container.current) {
            const myEcharts = echarts.init(container.current)
            myEcharts.setOption(option)
        }
    }, [option])

    return (
        <Chart ref={container} />
    )
}
export default ChartSection