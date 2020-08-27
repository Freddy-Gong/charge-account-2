import { useState, useEffect } from 'react'
import { useUpdate } from './useUpdate'

export type Record = {
    tagId: number,
    category: '-' | '+'
    account: number
}

const useRecords = () => {
    const [records, setRecords] = useState<Record[]>([])
    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
    }, [])
    const addRecords = (newRecord: Record) => {
        if (newRecord.account <= 0) {
            alert('请输入金额')
            return false
        }
        if (newRecord.tagId < 0) {
            alert('请选择标签')
            return false
        }
        setRecords([...records, newRecord])
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