import { ProductFetchConst } from "../../Common/constant";

const initialState = {
    productDeatails: [],
    fetching: false,
    fetched: false
}

const ProductDetail = (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case ProductFetchConst.ProductMatchReq:
            state = {
                ...state,
                fetching: true
            }
            break;
        case ProductFetchConst.ProductMatchSuccess:
            state = {
                ...state,
                productDeatails: action.payload,
                fetching: false,
                fetched: true
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

export default ProductDetail;