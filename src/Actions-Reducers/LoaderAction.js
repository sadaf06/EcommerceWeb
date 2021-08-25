import { Loader } from "../Common/constant"

export const loaderOn = () => {
    return async dispatch => {
        dispatch({ type: Loader.Loader_On })
    }
}
export const loaderOff = () => {
    return async dispatch => {
        dispatch({ type: Loader.Loader_Off })
    }
}