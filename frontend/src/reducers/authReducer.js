export const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  username: null,
  token: null,
  userError: null,
  passwordError: null
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
        username: action.username,
        token: action.token
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        userError: action.userError,
        passwordError: action.passwordError
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        token: null
      };
    default:
      return state;
  }
};
