import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveDrawer from './components/Drawer';
import { Scrollbars } from 'react-custom-scrollbars';

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Marck Script'
  }
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <Scrollbars style={{ height: '100vh' }}>
      <Router>
        <ThemeProvider theme={theme}>
          <ResponsiveDrawer />
        </ThemeProvider>

        <BaseRouter />
      </Router>
    </Scrollbars>
  );
}

export default App;
