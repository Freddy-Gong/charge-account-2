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

const defaultDate = {
    tagId: -1 as number,
    category: '-' as ('-' | '+'),
    account: 0
}

const NumberPad = () => {
    const [selected, setSelected] = useState(defaultDate)
    const onChange = (obj: Partial<typeof selected>) => {
        setSelected({
            ...selected,
            ...obj
        })
    }
    const submit = () => {

    }
    const [manageTag, setManageTag] = useState(false)
    return (
        <manageContext.Provider value={{ manageTag, setManageTag }}>
            <Header />
            <Category value={selected.category} onChange={(category) => onChange({ category })} />
            <TagsSection value={selected.tagId} onChange={(tagId) => {
                onChange({ tagId })
            }} />
            <PadSection value={selected.account} onChange={(account) => {
                onChange({ account })
            }} onOk={submit} />
        </manageContext.Provider>
    )
}

export { NumberPad, manageContext }