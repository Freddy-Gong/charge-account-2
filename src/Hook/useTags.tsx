import { useState, useEffect } from 'react'
import createId from 'lib/CreateId'
import { useUpdate } from './useUpdate'

const useTags = () => {
    const [tags, setTags] = useState<{ id: number, name: string }[]>([])
    useEffect(() => {
        let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]')
        if (localTags.length === 0) {
            localTags = [{ id: createId(), name: '餐饮' },
            { id: createId(), name: '交通' }, { id: createId(), name: '医疗' }, { id: createId(), name: '教育' }, { id: createId(), name: '娱乐' }, { id: createId(), name: '购物' }, { id: createId(), name: '其他' }]
        }
        setTags(localTags)
    }, [])
    useUpdate(() => {
        window.localStorage.setItem('tags', JSON.stringify(tags))
    }, tags)
    const AddTag = () => {
        const tagName = window.prompt('新标签名称')
        if (tagName !== null && tagName !== '') {
            const tagsClone = JSON.parse(JSON.stringify(tags))
            tagsClone.splice(-1, 0, { id: createId(), name: tagName })
            setTags(tagsClone)
        }
    }
    const DeleteTag = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id))
    }
    return { tags, AddTag, DeleteTag }
}
export default useTags