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
    let incomeHash: { value: number, name: string }[] = [], spendingHash: { value: number, name: string }[] = []
    let hash: { value: number, name: string } = { value: 0, name: '' }
    if (circleData) {
        circleData.forEach((cd) => {
            hash = { value: 0, name: '' }
            if (cd.category === '-' && cd.account && cd.tagId) {
                hash.value = cd.account
                hash.name = tags.filter((t) => t.id === cd.tagId)[0].name
                spendingHash.push(hash)
                return spendingHash
            } else if (cd.category === '+' && cd.account && cd.tagId) {
                hash.value = cd.account
                hash.name = tags.filter((t) => t.id === cd.tagId)[0].name
                incomeHash.push(hash)
                return incomeHash
            }
        })
    }
    let option = {}
    if (props.category === '-') {
        if (spendingHash.length === 0) {
            spendingHash = [{ value: 100, name: '未消费' }]
        }
        option = {
            title: {
                text: props.value + '日消费分布'
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
                    data: spendingHash
                }
            ]
        };
    } else if (props.category === '+') {
        if (incomeHash.length === 0) {
            incomeHash = [{ value: 100, name: '未收入' }]
        }
        option = {
            title: {
                text: props.value + '日收入分布'
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
                    data: incomeHash
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