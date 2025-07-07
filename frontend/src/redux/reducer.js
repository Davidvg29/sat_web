import { SET_USER } from "./action-types";

const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,         
          ...action.payload      
        }
      };
    default:
      return state;
  }
};

export default reducer;