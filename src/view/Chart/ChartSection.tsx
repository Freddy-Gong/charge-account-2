import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import echarts from 'echarts'
import Time from 'Components/TIme'
import { useRecords, Record } from 'Hook/useRecords'
import { defaultDate } from '../NumberPad'
import Circle from './CircleChart'
import { useUpdate } from 'Hook/useUpdate'


const Chart = styled.div`
    width:100%;
    height:450px;
`
type Props = {
    value: '-' | '+',
    time: 'day' | 'month',
    monthOrDay: string
}

const ChartSection: React.FC<Props> = (props) => {
    const { records } = useRecords()
    const container = useRef<HTMLDivElement>(null)
    const { MonthNumber, DayNumber, YearNumber } = Time()
    const [dayName, setDayName] = useState<string>('')
    useUpdate(() => {
        setDayName(props.monthOrDay)
    }, [props.time])
    const XArray: string[] = []
    let startSet: number = 0
    let endSet: number = 0
    const hash: { [key: string]: Partial<Record>[] } = {}
    if (props.time === 'day') {
        for (let i = 1; i < 31; i++) {
            XArray.push(MonthNumber + '-' + i)
        }
        if (DayNumber < 8) {
            startSet = 0
            endSet = 20
        } else {
            endSet = DayNumber / 30 * 100
            startSet = endSet - 20
        }
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
    } else if (props.time === 'month') {
        for (let i = 1; i < 13; i++) {
            XArray.push(i.toString())
        }
        if (MonthNumber < 8) {
            startSet = 0
            endSet = 50
        } else {
            endSet = MonthNumber / 12 * 100
            startSet = endSet - 50
        }
        XArray.forEach((x) => {
            if (!(x in hash)) {
                hash[x] = [defaultDate]
            }
            records.forEach((r) => {
                if (x === r.month) {
                    hash[x].push(r)
                }
            })
        })
    }
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
            yAxis: {
            },
            dataZoom: [{
                type: 'slider',
                start: startSet,
                end: endSet,
            }],
            itemStyle: {
                color: '#c23531'
            },
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
            dataZoom: [{
                type: 'slider',
                start: startSet,
                end: endSet,
            }],
            itemStyle: {
                color: 'green'
            },
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
            myEcharts.on('click', function (params: any) { setDayName(params.name) })
        }
    }, [option])
    return (
        <>
            <Chart ref={container} />
            <Circle value={dayName} hash={hash} category={props.value} />
        </>
    )
}
export default ChartSection