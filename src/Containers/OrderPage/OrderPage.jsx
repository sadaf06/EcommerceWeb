import React, { useEffect } from 'react'
import CardContainer from '../../Components/CardContainer'
import { useDispatch, useSelector } from 'react-redux'
import LayoutHead from '../../Components/Layout'
import { userAddressConstant } from '../../Common/constant'
import { getOrder } from "../../Actions-Reducers/Orders/OrderAction"

/**
* @author
* @function OrderPage
**/

const OrderPage = (props) => {
    const dispatch = useDispatch();
    const allOrders = useSelector(state => state.allOrders.allOrders)
    const auth = useSelector((state) => state.SignIn)

    useEffect(() => {
        dispatch({ type: userAddressConstant.orderSuccesDone })
    }, [])
    if (!auth.authenticate) {
        props.history.push("/")
    }
    useEffect(() => {
        dispatch(getOrder())
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <LayoutHead />
            {allOrders.length > 0 &&
                allOrders.map((order, ind) =>
                    <CardContainer key={ind}>
                        <div>
                            {order.products.map((product, ind) =>
                                <>
                                    <div>
                                        {product.productId.name}
                                    </div>
                                    <div>
                                        {product.buyPrice}
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContainer>
                )
            }
        </div>
    )
}


export default OrderPage