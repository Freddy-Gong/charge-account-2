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
}
type newRecord = Omit<Record, 'date' | 'day'>

const useRecords = () => {
    const [records, setRecords] = useState<Record[]>([])
    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
    }, [])
    const { FullTime, Day } = Time()
    const addRecords = (newRecord: newRecord) => {
        if (newRecord.account <= 0) {
            alert('请输入金额')
            return false
        }
        if (newRecord.tagId < 0) {
            alert('请选择标签')
            return false
        }
        const record = { ...newRecord, date: FullTime, day: Day }
        setRecords([...records, record])
        return true
    }
    useUpdate(() => {
        window.localStorage.setItem('records', JSON.stringify(records))
    }, records)
    return {
        records,
        addRecords
    }
}
export { useRecords }