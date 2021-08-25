import React, { useState } from 'react'
import "./input.css"

/**
* @author
* @function Input
**/

const Input = (props) => {
    const [inputFocus, setFocus] = useState(false)
    return (
        <>
            <div className="inputcontainer">
                <label htmlFor={props.lableFor} className={inputFocus || props.value ? "focus" : ""}>{props.lable}</label>

                <input
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onchange}
                    onFocus={(e) => { setFocus(true) }}
                    onKeyPress={props.onkeypress}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setFocus(false)
                        }
                    }}
                    style={props.style}>
                </input>
            </div>
        </>
    )
}
const Button = (props) => {
    return (
        <>
            <button style={{
                backgroundColor: `${props.bgcolor}`, color: `${props.color}`
                , boxShadow: `${props.shadow}`, borderRadius: "2px", width: `${props.width}`
            }}
                className="MatBtn"
                onClick={props.onclick}> {props.btnName}</button>
        </>
    )
}

export { Input, Button }