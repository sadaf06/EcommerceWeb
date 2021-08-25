import axiosIn from "../../Common/axios";
import { Loader, ProductFetchConst } from "../../Common/constant";

export const ProductMatch = (productId) => {
    return async (dispatch) => {
        dispatch({ type: ProductFetchConst.ProductMatchReq });
        dispatch({ type: Loader.Loader_On })
        const res = await axiosIn.get(`/product/${productId}`)
        // console.log(res.data);
        if (res.status === 200) {
            dispatch({ type: ProductFetchConst.ProductMatchSuccess, payload: res.data.data })
            dispatch({ type: Loader.Loader_Off })
        }
    }
}