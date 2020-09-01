import React, { useContext, useRef } from 'react'
import useTags from 'Hook/useTags'
import TagWrapper from './TagWrapper'
import Icon from 'Components/Icon'
import styled from 'styled-components'
import { manageContext } from '../NumberPad'


const Tags = styled.div`
    display:flex;
    flex-wrap:wrap;
    height:200px;
    overflow:scroll;
    > .selected{
        > .sign{
            border:1px solid black;
        }
    }
`

type Props = {
    value: number,
    classify: '-' | '+',
    onChange: (value: number) => void
}

const TagsSection: React.FC<Props> = (prop) => {
    const { tags, AddTag, DeleteTag } = useTags(prop.classify)
    const { manageTag } = useContext(manageContext)
    const selectedTag = prop.value
    const TagWrapperRef = useRef<HTMLDivElement>(null)
    const TagRef = useRef<HTMLDivElement>(null)
    // useUpdate(() => {
    //     if (TagWrapperRef.current && TagRef.current) {
    //         const height = TagWrapperRef.current.getClientRects()[0].height
    //         TagRef.current.style.height = 2 * height + 10 + 'px'
    //     }
    // }, [])
    const getClassName = (tagId: number) => selectedTag === tagId && manageTag === false ? 'selected' : ''
    const showTags = tags.filter((t) => t.category === prop.classify)
    return (
        <Tags ref={TagRef}>
            {showTags.map((t) =>
                <TagWrapper key={t.id} onClick={() => prop.onChange(t.id)}
                    className={getClassName(t.id)}>
                    <Icon name={t.name} className="sign" onClick={(e) => manageTag === true ? e.stopPropagation() : e} />
                    <span>{t.name}</span>
                    <Icon name='删除' className={'delete' + (manageTag ? 'Active' : '')} onClick={() => DeleteTag(t.id)} />
                </TagWrapper>
            )}
            <TagWrapper ref={TagWrapperRef} onClick={AddTag}>
                <Icon name='添加' />
                <span>添加</span>
            </TagWrapper>
        </Tags>


    )
}
export default TagsSection