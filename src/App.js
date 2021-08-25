import { React, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchCat } from "./Actions-Reducers/Category/CategoryAction";
import './App.css';
import Home from './Containers/home/home'
import ProductListByslug from "./Containers/ProductList/ProductList.jsx";
import { isUserSignin } from "./Actions-Reducers/SIgnIn/SignInAction";
import ProductPage from "./Containers/ProductPage/ProductPage";
import Cart from "./Containers/Cart/Cart";
import { savingToDatabase } from "./Actions-Reducers/Cart/CartAction";
import Loader from "./Components/Loader";
import OrderPlacePage from "./Containers/OrderPlacePage/orderPlacePage";
import { getAddress } from "./Actions-Reducers/userAddress/userAddressAction";
import OrderConfirmPage from "./Containers/OrderConfirmed";
import OrderPage from "./Containers/OrderPage/OrderPage";
import { getOrder } from "./Actions-Reducers/Orders/OrderAction";

function App() {

  const auth = useSelector((state) => state.SignIn)
  const LoaderState = useSelector(state => state.Loader)
  const [dark, setDark] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCat());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserSignin())
    }
    // eslint-disable-next-line
  }, [auth.authenticate])
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getAddress())
    }
    // eslint-disable-next-line
  }, [auth.authenticate])
  useEffect(() => {
    dispatch(savingToDatabase());
    // eslint-disable-next-line
  }, [auth.authenticate]);
  const loader = () => {
    if (LoaderState.status) {
      return <Loader />
    } else {
      return null
    }
  }
  useEffect(() => {
    dispatch(getOrder())
    // eslint-disable-next-line
  }, [])

  return (
    <div className={dark ? "App activeDark" : "App"}>
      {loader()}
      <button className="darkmode" onClick={(e) => { setDark(!dark) }}>{dark ? "Light Mode" : "Night Mode"}</button>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart/product" component={Cart} />
        <Route path="/orderPlace/product" component={OrderPlacePage} />
        <Route path="/allOrders" component={OrderPage} />
        <Route path="/order/confirmed" component={OrderConfirmPage} />
        <Route path="/:slug" exact component={ProductListByslug} />
        <Route path="/:slug/:prodsId/productPage" exact component={ProductPage} />
      </Switch>
    </div>
  );
}

export default App;
