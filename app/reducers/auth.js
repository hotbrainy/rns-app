import {LOGIN_SUCCESS, FORGOT_PASSWORD_USER, SET_USER_DATA, REMOVE_USER_DATA} from '@constants';

const initialState = {
  user: {},
  forgot_password_user: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, user: action.data, login_state: true};
    case FORGOT_PASSWORD_USER:
      return {...state, forgot_password_user: action.data};
    case SET_USER_DATA:
      return {...state, user: action.data};
    case REMOVE_USER_DATA: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
