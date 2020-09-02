import { useState, useEffect } from 'react'
import { useUpdate } from './useUpdate'
import Time from 'Components/TIme'

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
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[{"tagId":2,"category":"-","account":20,"note":"","date":"2020-9-2","day":"2","month":"9","creatAt":"2020-09-02T06:45:43.209Z"},{"tagId":3,"category":"-","account":60,"note":"","date":"2020-9-2","day":"2","month":"9","creatAt":"2020-09-02T06:45:49.662Z"},{"tagId":7,"category":"-","account":100,"note":"","date":"2020-9-2","day":"2","month":"9","creatAt":"2020-09-02T06:46:06.925Z"},{"tagId":10,"category":"+","account":800,"note":"终于发奖金了","date":"2020-9-2","day":"2","month":"9","creatAt":"2020-09-02T06:52:38.412Z"},{"tagId":2,"category":"-","account":50,"note":"","date":"2020-9-1","day":"1","month":"9","creatAt":"2020-09-02T06:52:51.728Z"},{"tagId":2,"category":"-","account":80,"note":"送人去医院","date":"2020-9-1","day":"1","month":"9","creatAt":"2020-09-02T06:53:07.280Z"}]'))
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
        return true
    }
    useUpdate(() => {
        window.localStorage.setItem('records', JSON.stringify(records))
    }, records)

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