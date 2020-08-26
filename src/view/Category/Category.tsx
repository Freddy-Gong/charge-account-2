import React, { useState } from 'react'
import styled from 'styled-components'

const CategoryWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    > span{
        font-size:16px;
        padding:10px 15px;
        color:#999;
        &.active{
            color:rgb(97,218,251);
            font-size:20px;
            border-bottom:1px solid rgb(97,218,251)
        }
    }
    
`
const Category = () => {
    const [categoryList] = useState<('-' | '+')[]>(['-', '+'])
    const [selectedC, setSelectedC] = useState<'-' | '+'>('-')
    const categoryMap = { '+': '收入', '-': '支出' }
    return (
        <CategoryWrapper>
            {categoryList.map((c) => <span className={c === selectedC ? 'active' : ''} onClick={() => setSelectedC(c)}>{categoryMap[c]}</span>)}
        </CategoryWrapper>
    )
}
export default Category