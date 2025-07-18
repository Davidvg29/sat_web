import { ALERT_MESSAGE, SET_USER } from "./action-types"

export const setUser = (user)=>{
    return {
        type: SET_USER,
        payload: user
    }
}

export const alertMessage = (active, status, message)=>{
    return {
        type: ALERT_MESSAGE,
        payload: {active: active, status:status, message: message}
    }
}