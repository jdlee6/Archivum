import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveDrawer from './components/Drawer';

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Marck Script'
  }
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <Router>
      <h2 style={{ textAlign: 'center' }}>Archivum</h2>
      <ThemeProvider theme={theme}>
        <ResponsiveDrawer />
      </ThemeProvider>

      <BaseRouter />
    </Router>
  );
}

export default App;
