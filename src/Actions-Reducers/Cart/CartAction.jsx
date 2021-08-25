import axiosIn from "../../Common/axios";
import { CartConstand, Loader } from "../../Common/constant";
import store from "../../Common/store";

export const addToCart = (productData, Qty = 1) => {
    return async (dispatch) => {
        dispatch({ type: CartConstand.CartReq });
        dispatch({ type: Loader.Loader_On });
        let getStoreCart = await store.getState().Cart.cartProduct;
        let auth = store.getState().SignIn;
        let quantity = getStoreCart[productData._id] ? getStoreCart[productData._id].quantity + Qty : 1;
        // const resPrice = await axiosIn.get(`/product/${productData._id}`)
        // const price = resPrice.data.data.price
        if (auth.authenticate) {
            let data = {
                cartProducts: [
                    {
                        product: productData._id,
                        quantity
                    }
                ]
            }
            const res = await axiosIn.post("/cart/addTocart", data)
            if (res.status === 200) {
                dispatch({ type: Loader.Loader_Off });
                dispatch(getCart());
            }
        } else {
            getStoreCart[productData._id] = {
                ...productData,
                quantity,
            }
            localStorage.setItem("cart", JSON.stringify(getStoreCart))
            dispatch({ type: CartConstand.CartSuccess, payload: getStoreCart });
            dispatch({ type: Loader.Loader_Off });
        }
    }
}
export const savingToDatabase = () => {
    return async (dispatch) => {
        let auth = store.getState().SignIn;
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (auth.authenticate) {
            if (cart) {
                const data = {
                    cartProducts: Object.keys(cart).map((keys, ind) => {
                        return {
                            product: cart[keys]._id,
                            quantity: cart[keys].quantity
                        }
                    })
                }
                localStorage.removeItem('cart');
                const res = await axiosIn.post("/cart/addTocart", data)
                if (res.status === 200) {
                    dispatch(getCart());
                }
            } else {
                dispatch(getCart());
            }
        } else {
            dispatch(getCart())
        }
    }
}
export const getCart = () => {
    return async dispatch => {
        let auth = store.getState().SignIn;
        dispatch({ type: Loader.Loader_On });
        if (auth.authenticate) {
            const res = await axiosIn.get("/cart/getCart");
            if (res.status === 200) {
                dispatch({ type: CartConstand.CartSuccess, payload: res.data.cartData })
                dispatch({ type: Loader.Loader_Off });
            } else if (res.status === 299) {
                dispatch({ type: CartConstand.CartSuccess, payload: {} })
            }
        } else {
            const data = JSON.parse(localStorage.getItem('cart'))
            if (data) {
                dispatch({ type: CartConstand.CartSuccess, payload: data })
                dispatch({ type: Loader.Loader_Off });
            } else {
                dispatch({ type: Loader.Loader_Off });
            }
        }
    }
}
export const removeCartfromStore = (_id) => {
    return async dispatch => {
        dispatch({ type: CartConstand.CartReq });
        const getStoreCart = await store.getState().Cart.cartProduct;
        let auth = store.getState().SignIn;
        if (auth.authenticate) {
            const res = await axiosIn.post("/cart/remCart", { _id })
            if (res.status === 200) {
                dispatch(getCart())
            }
        } else {
            delete getStoreCart[_id];
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(getStoreCart))
            dispatch({ type: CartConstand.CartSuccess, payload: getStoreCart });
        }
    }
}