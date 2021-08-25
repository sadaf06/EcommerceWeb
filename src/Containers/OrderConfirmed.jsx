import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../Components/helper/Input'
import LayoutHead from '../Components/Layout'


/**
* @author
* @function OrderConfirmPage
**/

const OrderConfirmPage = (props) => {
    const userAddress = useSelector(state => state.UserAddress)
    return (
        <LayoutHead>
            <div style={{
                margin: "20px", display: 'flex', flexDirection: "column",
                height: "200px", alignItems: "center", justifyContent: "space-evenly"
            }}>

                {userAddress.orderStatus ?
                    <span style={{ backgroundColor: "lightgreen", padding: "10px", fontSize: "1.5rem" }}> "Your Order Placed Successfully"</span> :
                    <span style={{ backgroundColor: "red", padding: "10px", fontSize: "1.5rem" }}>Some Error Accured, Please Check In Orders </span>}`

                <Button
                    btnName="Go To Orders"
                    color="white"
                    width="150px"
                    onclick={() => { props.history.push("/allOrders") }} />
            </div>
        </LayoutHead>
    )
}


export default OrderConfirmPage