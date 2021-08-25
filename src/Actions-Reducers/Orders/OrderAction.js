import axiosIn from "../../Common/axios"
import { Loader, OrderConstand } from "../../Common/constant";

export const getOrder = () => {
    return async dispatch => {
        dispatch({ type: Loader.Loader_On })
        const res = await axiosIn.get("/order/fetch");
        if (res.status === 200) {
            dispatch({ type: OrderConstand.OrderSuccess, payload: res.data })
            dispatch({ type: Loader.Loader_Off })
        }
    }
}