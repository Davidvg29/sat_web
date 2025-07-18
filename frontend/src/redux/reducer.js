import { alertMessage } from "./action";
import { ALERT_MESSAGE, SET_USER } from "./action-types";

const initialState = {
    user: {},
    alertMessage:{
      active: false,
      status:null,
      message:""
    }
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
      case ALERT_MESSAGE:
        return {
          ...state, 
          alertMessage: {
            active: action.payload.active,
            status: action.payload.status,
            message: action.payload.message
          }
        }
    default:
      return state;
  }
};

export default reducer;