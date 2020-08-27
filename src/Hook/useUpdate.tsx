import { useRef, useEffect } from 'react'

const useUpdate = (fn: () => void, dependence: any[]) => {
    const count = useRef(0)
    useEffect(() => {
        count.current += 1
    })
    useEffect(() => {
        if (count.current > 1) {
            fn()
        }
    }, [fn, dependence])
}

export { useUpdate }