import { categoryConst } from "../../Common/constant";

const initialState = {
  category: [],
  Loading: false,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConst.Cat_Req:
      state = {
        ...state,
        Loading: true,
      };
      break;
    case categoryConst.Cat_Success:
      state = {
        ...state,
        Loading: false,
        category: action.payload,
      };
      break;
    default:
      state = {
        ...state
      }
      break;
  }
  return state;
};

export default CategoryReducer
