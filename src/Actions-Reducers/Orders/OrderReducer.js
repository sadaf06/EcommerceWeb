import { OrderConstand } from "../../Common/constant"

const intialData = {
    allOrders: [],
}

const Orders = (state = intialData, action) => {
    switch (action.type) {
        case OrderConstand.OrderSuccess:
            state = {
                ...state,
                allOrders: action.payload
            }
            break;
        default:
            state = {
                ...state
            }
            break;
    }
    return state;
}

export default Orders;