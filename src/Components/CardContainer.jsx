import React from 'react'
import "./CardContainer.css"
/**
* @author
* @function CardContainer
**/

const CardContainer = (props) => {
    return (
        <div className="CardMainContainer">
            {props.children}

        </div>
    )
}


export default CardContainer