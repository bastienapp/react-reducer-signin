/* eslint-disable import/prefer-default-export */
export const initialState = {
  email: 'email@test.com',
  password: 'test123456',
  load: false,
  error: null,
  userConnected: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'FORM_UPDATED':
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case 'LOADING':
      return {
        ...state,
        load: true,
        error: null,
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        load: false,
        userConnected: payload,
      };
    case 'SIGNIN_FAILED':
      return {
        ...state,
        load: false,
        error: payload,
      };
    case 'DISCONNECT':
      return {
        ...state,
        userConnected: null,
      };
    default:
      return state;
  }
};
