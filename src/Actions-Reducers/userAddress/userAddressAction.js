import axiosIn from "../../Common/axios"
import { Loader, userAddressConstant } from "../../Common/constant";
import { getCart } from "../Cart/CartAction";


export const userAddress = (data) => {
    return async dispatch => {
        dispatch({ type: Loader.Loader_On })
        const res = await axiosIn.post("/AddUserAddress", data);
        if (res.status === 200) {
            dispatch({ type: userAddressConstant.addressuccess, payload: res.data.data.Address })
            dispatch({ type: Loader.Loader_Off })

        }
    }
}
export const deleteSelectedAddress = (data) => {
    return async dispatch => {
        dispatch({ type: Loader.Loader_On })
        const res = await axiosIn.post("/AddUserAddress", data)
        if (res.status === 200) {
            dispatch({ type: userAddressConstant.addressuccess, payload: res.data.data.Address })
        }
    }
}
export const getAddress = () => {
    return async dispatch => {
        const res = await axiosIn.get("/getUserAddress")
        if (res.status === 200) {
            dispatch({ type: userAddressConstant.addressuccess, payload: res.data.data.Address })
        }
    }
}
export const order = (orderData) => {
    return async dispatch => {
        const res = await axiosIn.post("/order/confirm", orderData)
        if (res.status === 201) {
            dispatch({ type: userAddressConstant.orderSucces })
            dispatch(getCart());
        }
    }
}