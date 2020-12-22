import * as constants from '../constants';

export const authReducer = (state, action) => {
  switch (action.type) {
    case constants.CHANGE_USERNAME:
        return {
          ...state, 
          username: action.username
        }

    case constants.CHANGE_PASSWORD: 
        return {
          ...state, 
          password: action.password
        }

    case constants.LOGIN: 
        return {
          ...state,
          loggedIn: action.loggedIn
        }

    case constants.LOGOUT: 
        return {
          ...state,
          loggedIn: action.loggedIn
        }
        
    default: 
        return state
  }
}