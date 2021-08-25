import axios from "axios";
import { url } from "../urlConf";
import store from "./store"
import { authConst } from "./constant";
let token = window.localStorage.getItem("token");
const axiosIn = axios.create({
  baseURL: url,
  headers: { auth: token ? token : "" },
});
axiosIn.interceptors.request.use((req) => {
  const { SignIn } = store.getState();
  // console.log(auth)
  req.headers.auth = SignIn.token ? SignIn.token : "";
  return req;
}, (error) => {
  console.log(error)
})

axiosIn.interceptors.response.use((res) => {
  return res;
}, (error) => {
  console.log(error.response);
  const { status, data } = error.response;
  if (status >= 400) {
    alert(data.message);
    if (status >= 400 && status <= 499) {
      window.localStorage.clear();
      store.dispatch({ type: authConst.SignUp_Fails })
      store.dispatch({ type: authConst.LogOut_Success })
    }
  }
  return Promise.reject(error);
})
export default axiosIn;
