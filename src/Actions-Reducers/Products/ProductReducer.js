import { ProductFetchConst } from "../../Common/constant"


const initialState = {
    AllProducts: [],
    ProductByPrice: {
        "under 10K": [],
        "under 15K": [],
        "under 20K": [],
        "under 30K": [],
        "more than 30K": []
    },
    req: false,
}
const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProductFetchConst.ProductFetchReq:
            state = {
                ...state,
                req: true,
            }
            break;
        case ProductFetchConst.ProductFetchSucces:
            state = {
                ...state,
                req: false,
                AllProducts: action.payload.data,
                ProductByPrice: action.payload.ProductByPrice,
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

export default ProductReducer;