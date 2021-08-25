import { userAddressConstant } from "../../Common/constant"

const initialData = {
    Address: [],
    orderStatus: false
}

const UserAddressReducer = (state = initialData, action) => {
    switch (action.type) {
        case userAddressConstant.addressuccess:
            state = {
                ...state,
                Address: action.payload
            }
            break;
        case userAddressConstant.orderSucces:
            state = {
                ...state,
                orderStatus: true
            }
            break;
        case userAddressConstant.orderSuccesDone:
            state = {
                ...state,
                orderStatus: false
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

export default UserAddressReducer;