import { useState, useEffect } from 'react'
import createId from 'lib/CreateId'
import { useUpdate } from './useUpdate'



const useTags = (props?: '-' | '+') => {
    const [tags, setTags] = useState<{ id: number, category: '-' | '+', name: string }[]>([])
    useEffect(() => {
        let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]')
        if (localTags.length === 0) {
            localTags = [{ id: createId(), category: '-', name: '餐饮' },
            { id: createId(), category: '-', name: '交通' }, { id: createId(), category: '-', name: '医疗' }, { id: createId(), category: '-', name: '教育' }, { id: createId(), category: '-', name: '娱乐' }, { id: createId(), category: '-', name: '购物' }, { id: createId(), category: '-', name: '其他' }, { id: createId(), category: '+', name: '工资' }, { id: createId(), category: '+', name: '奖金' }, { id: createId(), category: '+', name: '红包' },
            { id: createId(), category: '+', name: '其他' }]
        }
        setTags(localTags)
    }, [])
    useUpdate(() => {
        window.localStorage.setItem('tags', JSON.stringify(tags))
    }, tags)
    const AddTag = () => {
        const tagName = window.prompt('新标签名称')
        if (tagName !== null && tagName !== '' && props) {
            const tagsClone = JSON.parse(JSON.stringify(tags))
            tagsClone.splice(-1, 0, { id: createId(), category: props, name: tagName })
            setTags(tagsClone)
        }
    }
    const DeleteTag = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id))
    }
    return { tags, AddTag, DeleteTag }
}
export default useTags