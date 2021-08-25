import { combineReducers } from "redux";
import CartReducer from "../Actions-Reducers/Cart/CartReducer";
import CategoryReducer from "../Actions-Reducers/Category/CategoryReducer";
import LoaderReducer from "../Actions-Reducers/LoderReducer";
import Orders from "../Actions-Reducers/Orders/OrderReducer";
import ProductDetail from "../Actions-Reducers/ProductMatch/ProductMatchReducer";
import ProductReducer from "../Actions-Reducers/Products/ProductReducer";
import SignInReducer from "../Actions-Reducers/SIgnIn/SignInReducer";
import SignUpReducer from "../Actions-Reducers/SignUp/SignUpReducer";
import UserAddressReducer from "../Actions-Reducers/userAddress/userAddressReducer";


const rootReducer = combineReducers({
  CategoryFectch: CategoryReducer,
  ProductFetch: ProductReducer,
  SignIn: SignInReducer,
  SignUp: SignUpReducer,
  ProductDetail: ProductDetail,
  Cart: CartReducer,
  Loader: LoaderReducer,
  UserAddress: UserAddressReducer,
  allOrders: Orders
});

export default rootReducer;
