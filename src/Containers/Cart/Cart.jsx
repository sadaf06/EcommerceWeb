import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LayoutHead from '../../Components/Layout'
import { url } from '../../urlConf';
import "./Cart.css"
import { Button } from '../../Components/helper/Input';
import { addToCart, removeCartfromStore } from '../../Actions-Reducers/Cart/CartAction';
import PriceCart from '../../Components/PriceCart';
import { loaderOn } from '../../Actions-Reducers/LoaderAction';
/**
* @author
* @function Cart
**/

const Cart = (props) => {
    const Cart = useSelector(state => state.Cart);
    const dispatch = useDispatch();
    const IncreaseQty = (_id) => {
        const ProductData = Cart.cartProduct[_id];
        let Qty = 1;
        dispatch(addToCart({ _id, name: ProductData.name, productImage: ProductData.productImage, price: ProductData.price }, Qty));
    }
    const DecreaseQty = (_id) => {
        const ProductData = Cart.cartProduct[_id];
        let Qty = -1;
        if (ProductData.quantity > 1) {
            dispatch(addToCart({ _id, name: ProductData.name, productImage: ProductData.productImage, price: ProductData.price }, Qty))
        }
    }
    const removeCart = (_id) => {
        dispatch(removeCartfromStore(_id));
    }
    const placeOrderbtn = (prop) => {
        dispatch(loaderOn());
        prop.history.push("/orderPlace/product")
    }
    if (props.orderSummary) {
        return (
            <>
                {Object.keys(Cart.cartProduct).length > 0 ? Object.keys(Cart.cartProduct).map((id, ind) => {
                    return (
                        <>
                            <div className="productNameLine" key={ind}>
                                <div className="PData">
                                    <img src={`${url}/public/${Cart.cartProduct[id].productImage}`} alt="image"></img>
                                    <div>
                                        <span>{Cart.cartProduct[id].name} </span><br></br>
                                        <span><b>Price : {Cart.cartProduct[id].quantity * Cart.cartProduct[id].price}</b></span>
                                    </div>
                                </div>
                                <span>Delivery in 7-6 Days</span>
                            </div>
                            <div className="productNameLine1" key={id}>
                                <div className="PData">
                                    <div className="cartbtn">
                                        <button onClick={() => { DecreaseQty(id) }}>-</button>
                                        <input type="number" value={Cart.cartProduct[id].quantity} readOnly></input>
                                        <button onClick={() => { IncreaseQty(id) }}>+</button>
                                    </div>
                                    <span>Save for Later</span>
                                    <span className="Remove-cart" onClick={() => { removeCart(id) }}>Remove from Cart</span>
                                </div>
                            </div>
                        </>
                    )
                }) : <div><span>NO Cart Product Available.</span></div>}
            </>
        )
    }
    return (
        <LayoutHead>
            <div className="CartContainer">
                <div className="CartData">
                    <div className="productCartdata">
                        {Object.keys(Cart.cartProduct).length > 0 ? Object.keys(Cart.cartProduct).map((id, ind) => {
                            return (
                                <>
                                    <div className="productNameLine" key={ind}>
                                        <div className="PData">
                                            <img src={`${url}/public/${Cart.cartProduct[id].productImage}`} alt="image"></img>
                                            <div>
                                                <span>{Cart.cartProduct[id].name} </span><br></br>
                                                <span><b>Price : {Cart.cartProduct[id].quantity * Cart.cartProduct[id].price}</b></span>
                                            </div>
                                        </div>
                                        <span>Delivery in 7-6 Days</span>
                                    </div>
                                    <div className="productNameLine1" key={id}>
                                        <div className="PData">
                                            <div className="cartbtn">
                                                <button onClick={() => { DecreaseQty(id) }}>-</button>
                                                <input type="number" value={Cart.cartProduct[id].quantity} readOnly></input>
                                                <button onClick={() => { IncreaseQty(id) }}>+</button>
                                            </div>
                                            <span>Save for Later</span>
                                            <span className="Remove-cart" onClick={() => { removeCart(id) }}>Remove from Cart</span>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : <div><span>NO Cart Product Available.</span></div>}

                        <div className="placeBtn">
                            <Button
                                btnName="Place Order"
                                onclick={() => placeOrderbtn(props)} />
                        </div>
                    </div>
                </div>
                <PriceCart />
            </div>
        </LayoutHead>
    )
}


export default Cart