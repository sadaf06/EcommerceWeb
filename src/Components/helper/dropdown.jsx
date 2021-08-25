import React from 'react'
import { Link } from 'react-router-dom'

/**
* @author
* @function Dropdown
**/

const Dropdown = (props) => {
    return (
        <>
            <div className="dropdown">
                <span className={props.mainbtn ? `${props.mainbtn}` : "defaultbtn"}
                    onClick={props.onclick}>{props.heading}</span>
                <ul className="userMenu">
                    {props.firstLine &&
                        <a href={props.firstLine.href} className="listMenu">
                            <li className="firstLine">
                                <span>{props.firstLine.text}</span>
                                <span className="blueColor">{props.firstLine.action}</span>
                            </li>
                        </a>
                    }
                    {props.lable && props.lable.map((lables, ind) =>
                        lables !== null &&
                        <Link key={ind} className="listMenu" to={lables.href} onClick={lables.btnOnclick ? lables.btnOnclick : null}><li>{lables.heading}</li></Link>
                    )}
                </ul>
            </div >
        </>
    )
}


export default Dropdown