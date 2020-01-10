import React, { createContext } from 'react';
import { authReducer, initialAuthState } from '../reducers/authReducer';
import { useReducer } from 'reinspect';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const useAuthState = useReducer(authReducer, initialAuthState, 1);

  return (
    <AuthContext.Provider value={useAuthState}>
      {props.children}
    </AuthContext.Provider>
  );
}
