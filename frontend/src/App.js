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
import { Helmet } from 'react-helmet';

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
        <LightContextProvider>
          <ModalContextProvider>
            <ThemeProvider theme={theme}>
              <ResponsiveDrawer />
            </ThemeProvider>
            <BaseRouter />
          </ModalContextProvider>
        </LightContextProvider>
      </Router>
      <Helmet>
        <style>{'body {background-color: #DDDDDD }'}</style>
      </Helmet>
    </div>
  );
}

export default App;

// background: #bbd2c5; /* fallback for old browsers */

//
