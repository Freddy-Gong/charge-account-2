import { useState, useEffect } from 'react'
import { useUpdate } from './useUpdate'

export type Record = {
    tagId: number,
    category: '-' | '+'
    account: number
    date: string
    day: string
}
type newRecord = Omit<Record, 'date' | 'day'>

const useRecords = () => {
    const [records, setRecords] = useState<Record[]>([])
    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
    }, [])
    const addRecords = (newRecord: newRecord) => {
        if (newRecord.account <= 0) {
            alert('请输入金额')
            return false
        }
        if (newRecord.tagId < 0) {
            alert('请选择标签')
            return false
        }
        const record = { ...newRecord, date: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + (new Date().getDate()).toString(), day: (new Date().getDate()).toString() }
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