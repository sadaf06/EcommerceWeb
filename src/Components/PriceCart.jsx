import React from 'react'
import { useSelector } from 'react-redux';

/**
* @author
* @function PriceCart
**/

const PriceCart = (props) => {
    const Cart = useSelector(state => state.Cart);
    return (
        <div style={{ width: "40%", position: "sticky", top: "0" }}>
            <div className="Cartprice">
                <div className="heading" style={{ fontSize: "1.5rem" }}>PRICE</div>
                <div>
                    <div className="flex-between">
                        <span>Delivery Charges:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex-between">
                        <div>Total Price ({Object.keys(Cart.cartProduct).length > 0 && Object.keys(Cart.cartProduct).reduce((accu, data) => {
                            return accu + Cart.cartProduct[data].quantity
                        }, 0)} Items) :
                        </div>
                        <div>
                            <b>{Object.keys(Cart.cartProduct).length > 0 && Object.keys(Cart.cartProduct).reduce((accu, data) => {
                                return accu + Cart.cartProduct[data].quantity * Cart.cartProduct[data].price
                            }, 0)}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PriceCart