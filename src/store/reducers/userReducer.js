//src9
import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS: //41ms31ss
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.user,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return { ...state };
    case actionTypes.PROCESS_LOGOUT:
      return { ...state };

    default:
      return state;
  }
};

export default appReducer;