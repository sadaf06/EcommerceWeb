import { Loader } from "../Common/constant";
const initialData = {
    status: false
}

const LoaderReducer = (state = initialData, action) => {
    switch (action.type) {
        case Loader.Loader_On:
            state = {
                status: true
            }
            break;
        case Loader.Loader_Off:
            state = {
                status: false
            }
            break;
        default:
            state = {
                ...initialData
            }
    }
    return state;
}

export default LoaderReducer;