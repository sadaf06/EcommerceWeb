import axiosIn from "../../Common/axios";
import { categoryConst } from "../../Common/constant";

export const fetchCat = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConst.Cat_Req });
    const res = await axiosIn.get("/category");

    if (res.status === 200) {
      dispatch({
        type: categoryConst.Cat_Success,
        payload: res.data.formatedCatlist,
      });
    }
  };
};
