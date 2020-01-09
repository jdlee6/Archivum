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

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Marck Script'
  }
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <LightContextProvider>
            <ModalContextProvider>
              <ThemeProvider theme={theme}>
                <ResponsiveDrawer />
              </ThemeProvider>
              <BaseRouter />
            </ModalContextProvider>
          </LightContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
