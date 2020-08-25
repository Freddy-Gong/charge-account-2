import React from 'react'
import Icon from "Components/Icon"
import Wrapper from './Wrapper'


const PadSection = () => {
    return (
        <Wrapper>
            <div className="calculator" >
                <div className="result">0</div>
                <button className="number-1" >1</button>
                <button className="number-2" >2</button>
                <button className="number-3" >3</button>
                <button className="add" >+</button>
                <button className="delete" ><Icon name="delete" /></button>
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