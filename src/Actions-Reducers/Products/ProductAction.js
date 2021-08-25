import axiosIn from "../../Common/axios"
import { Loader, ProductFetchConst } from "../../Common/constant"

export const ProductList = (slug) => {
    return async (dispatch) => {
        dispatch({ type: Loader.Loader_On });
        const res = await axiosIn.get(`/${slug}`)
        // console.log(res.data)
        if (res.status === 200) {
            dispatch({ type: ProductFetchConst.ProductFetchSucces, payload: res.data })
            // dispatch({ type: Loader.Loader_Off });
        }
    }
}