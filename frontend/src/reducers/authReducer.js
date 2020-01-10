export const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  token: '',
  error: ''
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
        token: action.payload.token
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload.err
      };

    case 'LOGOUT':
      return {
        ...state
      };
    default:
      return state;
  }
};
