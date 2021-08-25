import { CartConstand } from "../../Common/constant"

const initialData = {
    cartProduct: {},
    req: false
}

const CartReducer = (state = initialData, action) => {
    switch (action.type) {
        case CartConstand.CartReq:
            state = {
                ...state,
                req: true
            }
            break;
        case CartConstand.CartSuccess:
            state = {
                ...state,
                req: false,
                cartProduct: action.payload
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

export default CartReducer;