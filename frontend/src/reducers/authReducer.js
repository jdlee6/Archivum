export const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  username: null,
  token: null,
  error: null
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        token: action.payload.token,
        error: null
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        token: null,
        error: action.payload.err
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        token: null,
        error: null
      };
    default:
      return state;
  }
};
