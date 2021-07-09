/* eslint-disable indent */
export const SIGNIN_CHANGE = 'SIGNIN_CHANGE';
export const SIGNIN_LOAD = 'SIGNIN_LOAD';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNOUT = 'SIGNOUT';

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case SIGNIN_LOAD:
      return {
        ...state,
        error: null,
        load: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        load: false,
        user: payload,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        load: false,
        error: payload,
      };
    case SIGNOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
