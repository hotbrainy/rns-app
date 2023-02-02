import {LOGIN_SUCCESS} from '@constants';
const initialState = {
  facilities: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, questions: action.data};
    default:
      return state;
  }
};
