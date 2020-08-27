import React, { useContext } from 'react'
import useTags from 'Hook/useTags'
import TagWrapper from './TagWrapper'
import Icon from 'Components/Icon'
import styled from 'styled-components'
import { manageContext } from '../NumberPad'


const Tags = styled.div`
    display:flex;
    flex-wrap:wrap;
    > .selected{
        > .sign{
            border:1px solid black;
        }
    }
`

type Props = {
    value: number,
    onChange: (value: number) => void
}

const TagsSection: React.FC<Props> = (prop) => {
    const { tags, AddTag } = useTags()
    const { manageTag } = useContext(manageContext)
    const selectedTag = prop.value
    const getClassName = (tagId: number) => selectedTag === tagId && manageTag === false ? 'selected' : ''
    return (
        <Tags>
            {tags.map((t) =>
                <TagWrapper key={t.id} onClick={() => prop.onChange(t.id)}
                    className={getClassName(t.id)}>
                    <Icon name={t.name} className="sign" />
                    <span>{t.name}</span>
                    <Icon name='编辑' className={'delete' + (manageTag ? 'Active' : '')} />
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