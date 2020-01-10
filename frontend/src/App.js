import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import ModalContextProvider from './contexts/ModalContext';
import LightContextProvider from './contexts/LightContext';
import AuthContextProvider from './contexts/AuthContext';
import { StateInspector } from 'reinspect';

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Marck Script'
  }
});
let formTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          //underline color when textfield is inactive
          backgroundColor: 'white',
          height: 1
        }
      }
    }
  }
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <div>
      <Router>
        <StateInspector>
          <AuthContextProvider>
            <LightContextProvider>
              <ModalContextProvider>
                <ThemeProvider theme={theme}>
                  <ResponsiveDrawer />
                </ThemeProvider>
                <ThemeProvider theme={formTheme}>
                  <BaseRouter />
                </ThemeProvider>
              </ModalContextProvider>
            </LightContextProvider>
          </AuthContextProvider>
        </StateInspector>
      </Router>
    </div>
  );
}

export default App;
