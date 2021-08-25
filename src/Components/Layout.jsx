import React from 'react'
import Header from './Header'
/**
* @author
* @function Layout
**/

const LayoutHead = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}


export default LayoutHead