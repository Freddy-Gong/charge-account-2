import React, { useState } from 'react'
import Icon from "Components/Icon"
import Wrapper from './Wrapper'


const PadSection = () => {
    const [result, setResult] = useState('0')
    const [calculator, setCalculator] = useState(false)
    const [dot, setDot] = useState(true)
    const Delete = () => {
        if (result.length === 1) {
            setResult('0')
        } else if (result === '0') {
            return
        } else {
            setResult(result.slice(0, -1))
        }
    }
    const calculate = (e: React.MouseEvent) => {
        const text = (e.target as HTMLButtonElement).textContent
        const evil = (fn: string) => {
            let Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
            return new Fn("return " + fn)();//result后面的空格相当重要
        }
        if (text === null) { return }
        switch (text) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (result === '0') {
                    setResult(text)
                } else {
                    setResult(result + text)
                }
                setCalculator(true)
                break
            case '+':
            case '-':
            case 'x':
            case '÷':
                if (calculator === true) {
                    setResult(result + text)
                    setCalculator(false)
                    setDot(true)
                }
                break
            case '.':
                if (dot === true) {
                    setResult(result + text)
                    setDot(false)
                }
                break
            case 'AC':
                setResult('0')
                break
            case '=':
                let equation = result.replace(new RegExp('x', 'g'), '*').replace(new RegExp('÷', 'g'), '/')
                setResult(parseFloat(evil(equation).toFixed(9)).toString())
                break
            case 'OK':
                break
        }
    }
    return (
        <Wrapper>
            <div className="calculator" onClick={calculate}>
                <div className="result">{result}</div>
                <button className="number-1" >1</button>
                <button className="number-2" >2</button>
                <button className="number-3" >3</button>
                <button className="add" >+</button>
                <button className="delete" onClick={Delete}><Icon name="delete" /></button>
                <button className="number-4" >4</button>
                <button className="number-5" >5</button>
                <button className="number-6" >6</button>
                <button className="subtract" >-</button>
                <button className="ac" >AC</button>
                <button className="number-7" >7</button>
                <button className="number-8" >8</button>
                <button className="number-9" >9</button>
                <button className="multiply" >x</button>
                <button className="OK">OK</button>
                <button className="number-0" >0</button>
                <button className="dot" >.</button>
                <button className="equal">=</button>
                <button className="divide" >÷</button>
            </div>
        </Wrapper>
    )
}
export default PadSection