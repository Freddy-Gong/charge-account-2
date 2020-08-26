import React, { useState, Dispatch, SetStateAction } from 'react'
import PadSection from './NumberPad/Pad'
import TagsSection from './Tags/Tags'
import Category from './Category/Category'
import Header from './Header/Header'
type Context = {
    manageTag: boolean;
    setManageTag: Dispatch<SetStateAction<boolean>>;
}
const manageContext = React.createContext<Partial<Context>>({})

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