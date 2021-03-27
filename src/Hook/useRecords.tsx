import { useState, useEffect } from 'react'
import Time from 'Components/TIme'
import axios from 'axios'

export type Record = {
    tagId: number,
    category: '-' | '+',
    account: number,
    note: string,
    date: string,
    day: string,
    month: string,
    creatAt: string,
}
type newRecord = Omit<Record, 'date' | 'day' | 'month' | 'creatAt'>

const useRecords = () => {
    const [records, setRecords] = useState<Record[]>([])
    useEffect(() => {
        axios.get('http://120.77.35.114:3000/record').then((response) => {
            console.log(response.data.record)
            setRecords(response.data.record)
        })
    }, [])

    const { FullTime, Day, Month } = Time()
    const addRecords = (newRecord: newRecord) => {
        if (newRecord.account <= 0) {
            alert('请输入金额')
            return false
        }

        if (newRecord.tagId < 0) {
            alert('请选择标签')
            return false
        }
        const record = { ...newRecord, date: FullTime, day: Day, month: Month, creatAt: (new Date()).toISOString() }
        setRecords([...records, record])
        axios.post('http://120.77.35.114:3000/record', { ...record })
        return true
    }
    // useUpdate(() => {
    //     window.localStorage.setItem('records', JSON.stringify(records))
    // }, records)

    //排序
    const hash: { [key: string]: Record[] } = {}
    records.forEach((r) => {
        const key = r.date
        if (!(key in hash)) {
            hash[key] = []
        }
        hash[key].push(r)
    })
    const array = Object.entries(hash).sort((a, b) => {
        if (a[0] === b[0]) return 0
        if (a[0] > b[0]) return -1
        if (a[0] < b[0]) return 1
        return 0
    })
    return {
        records,
        addRecords,
        array,
    }
}
export { useRecords }