import React, { useState } from 'react'
import useTags from 'Hook/useTags'
import TagWrapper from './TagWrapper'
import Icon from 'Components/Icon'
import styled from 'styled-components'

const Tags = styled.div`
    display:flex;
    flex-wrap:wrap;
    > .selected{
        > .icon{
            border:1px solid black;
        }
    }
`
type Props = {
    manage: boolean;
}

const TagsSection: React.FC<Props> = (prop) => {
    const { tags, AddTag, DeleteTag } = useTags()
    const [selectedTag, setSelectedTag] = useState<number>()
    const selected = (tagId: number) => {
        setSelectedTag(tagId)
    }
    const getClassName = (tagId: number) => selectedTag === tagId ? 'selected' : ''
    return (
        <Tags>
            {tags.map((t) =>
                <TagWrapper key={t.id} onClick={() => selected(t.id)}
                    className={getClassName(t.id)}>
                    <Icon name={t.name} />
                    <span>{t.name}</span>
                    <Icon name='删除' className={'delete' + (prop.manage ? 'Active' : '')} onClick={() => DeleteTag(t.id)} />
                </TagWrapper>
            )}
            <TagWrapper onClick={AddTag}>
                <Icon name='添加' />
                <span>添加</span>
            </TagWrapper>
        </Tags>
    )
}
export default TagsSection