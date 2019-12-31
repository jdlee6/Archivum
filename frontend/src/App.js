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

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Marck Script'
  }
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <Router>
      <LightContextProvider>
        <ModalContextProvider>
          {/* this is for responsive font */}
          <ThemeProvider theme={theme}>
            <ResponsiveDrawer />
          </ThemeProvider>
          <BaseRouter />
        </ModalContextProvider>
      </LightContextProvider>
    </Router>
  );
}

export default App;
