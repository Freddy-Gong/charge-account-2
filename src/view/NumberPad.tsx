import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'Components/Icon'
import PadSection from './NumberPad/Pad'
import TagsSection from './Tags/Tags'
import Category from './Category/Category'
import Header from './Header/Header'

const manageContext = React.createContext({})

const NumberPad = () => {
    const [manageTag, setManageTag] = useState(false)
    return (
        <manageContext.Provider value={{ manageTag, setManageTag }}>
            <Header />
            <Category />
            <TagsSection manage={manageTag} />
            <PadSection />
        </manageContext.Provider>
    )
}

export { NumberPad, manageContext }