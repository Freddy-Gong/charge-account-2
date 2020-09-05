import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import echarts from 'echarts'
import { Record } from 'Hook/useRecords'
import useTags from 'Hook/useTags'


const CircleChart = styled.div`
    width:100%;
    height:350px;
`
type Props = {
    value: string
    hash: {
        [key: string]: Partial<Record>[];
    }
    category: '-' | '+'
}
const Circle: React.FC<Props> = (props) => {
    const { tags } = useTags()
    const container = useRef<HTMLDivElement>(null)
    const circleData = props.hash[props.value]
    let todayMoney: { value: number, name: string }[] = []
    const hash: { [key: string]: number } = {}
    if (circleData) {
        circleData.forEach((cd) => {
            if (cd.category === '-' && cd.account && cd.tagId) {
                const key = tags.filter((t) => t.id === cd.tagId)[0].name
                if (!(key in hash)) {
                    hash[key] = 0
                }
                hash[key] += cd.account
            } else if (cd.category === '+' && cd.account && cd.tagId) {
                const key = tags.filter((t) => t.id === cd.tagId)[0].name
                if (!(key in hash)) {
                    hash[key] = 0
                }
                hash[key] += cd.account
            }
        })
    }
    const array = Object.entries(hash)
    console.log(array)
    array.forEach((a) => {
        const inOrOutHash = { value: a[1], name: a[0] }
        todayMoney.push(inOrOutHash)
    })
    let option = {}
    if (props.category === '-') {
        if (todayMoney.length === 0) {
            todayMoney = [{ value: 100, name: '未消费' }]
        }
        option = {
            title: {
                text: props.value + '日消费分布',
                textStyle: {
                    fontSize: 15,
                    color: "black",
                    fontWeight: 'normal',

                },
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    center: ['50%', '35%'],
                    radius: ['30%', '50%'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    },
                    data: todayMoney
                }
            ]
        };
    } else if (props.category === '+') {
        if (todayMoney.length === 0) {
            todayMoney = [{ value: 100, name: '未收入' }]
        }
        option = {
            title: {
                text: props.value + '日收入分布',

            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    center: ['50%', '35%'],
                    radius: ['30%', '50%'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    },
                    data: todayMoney
                }
            ]
        };
    }

    useEffect(() => {
        if (container.current) {
            const myEcharts = echarts.init(container.current)
            myEcharts.setOption(option)
        }
    }, [option])
    return (
        <CircleChart ref={container} />
    )
}
export default Circle