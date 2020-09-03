import React, { useState } from 'react'
import styled from 'styled-components'

const CategoryWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    > span{
        display:flex;
        justify-content:center;
        align-items:center;
        height:48px;
        font-size:16px;
        padding:10px 15px;
        color:#999;
        position:relative;
        transition:font-size 0.2s;
        &.active{
            color:#1296db;
            font-size:20px;
        }
        &.active::after{
            content:'';
            display:block;
            background:#1296db;
            position:absolute;
            bottom:0;
            width:100%;
            left:0;
            height:2px;
        }
    }
    
`

type Props = {
    value: '-' | '+',
    onChange: (value: '-' | '+') => void
}
const Category: React.FC<Props> = (prop) => {
    const [categoryList] = useState<('-' | '+')[]>(['-', '+'])
    const selectedC = prop.value
    const categoryMap = { '+': '收入', '-': '支出' }
    return (
        <CategoryWrapper>
            {categoryList.map((c) => <span key={c} className={c === selectedC ? 'active' : ''} onClick={() => prop.onChange(c)}>{categoryMap[c]}</span>)}
            <div className="line"></div>
        </CategoryWrapper>
    )
}
export default Category