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
    const circleData = props.hash[props.value]
    const { tags } = useTags()
    console.log(tags)
    let incomeHash: { value: number, name: string }[] = [], spendingHash: { value: number, name: string }[] = []
    let hash: { value: number, name: string } = { value: 0, name: '' }
    circleData.map((cd) => {
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
    const container = useRef<HTMLDivElement>(null)
    let option = {}
    if (props.category === '-') {
        option = {
            title: {
                text: props.value + '日消费分布'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    data: spendingHash
                }
            ]
        };
    } else if (props.category === '+') {
        option = {
            title: {
                text: props.value + '日消费分布'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
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