import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuTreeView from './MenuTreeView';
import PropTypes from 'prop-types';
import Radium from 'radium';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { LightContext } from '../contexts/LightContext';

const drawerStyles = {
  light: {
    background: ['linear-gradient(to bottom, #f0f0f1, #e2e2e3)', '#f0f0f1']
  },
  dark: {
    background: ['linear-gradient(to bottom, #343434, #252525)', '#404040']
  }
};

const useStyles = makeStyles({
  paperDark: {
    width: '40%',
    '@media (min-width:768px)': {
      width: '20%'
    },
    background: drawerStyles.dark.background,
    color: 'white'
  },
  paperLight: {
    width: '40%',
    '@media (min-width:768px)': {
      width: '20%'
    },
    background: drawerStyles.light.background,
    color: 'black'
  }
});

function ResponsiveDrawer(props) {
  const { container, history } = props;
  const theme = useTheme();
  const styles = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { modalToggle } = useContext(ModalContext);
  const { themeMode, themeBool } = useContext(LightContext);
  const [state, authDispatch] = useContext(AuthContext);
  const { isLoggedIn } = state;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <div></div>;

  const drawerMode = themeBool
    ? { paper: styles.paperLight }
    : { paper: styles.paperDark };

  const handleLogout = e => {
    e.preventDefault();
    authDispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    history.push('/');
  };

  return (
    <div>
      <CssBaseline />
      {!modalToggle ? (
        <AppBar
          position="fixed"
          style={{
            background: themeMode.background,
            maxHeight: themeMode.maxHeight
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              style={{ color: themeMode.icon }}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <div className="title">
              <Link
                to="/"
                style={{ color: themeMode.text, textDecoration: 'none' }}
              >
                Archivum
              </Link>
            </div>
            <div className="user-menu">
              {isLoggedIn && localStorage.getItem('token') !== null ? (
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      style={{
                        color: themeMode.text,
                        textDecoration: 'none'
                      }}
                    >
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      style={{ color: themeMode.text, textDecoration: 'none' }}
                    >
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link
                      to="/register"
                      style={{
                        color: themeMode.text,
                        textDecoration: 'none'
                      }}
                    >
                      <span>Sign Up</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      style={{
                        color: themeMode.text,
                        textDecoration: 'none'
                      }}
                    >
                      <span>Log In</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </Toolbar>
        </AppBar>
      ) : null}
      <nav>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            classes={drawerMode}
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
            <MenuTreeView history={history} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === 'undefined' ? Object : Element
  )
};

export default Radium(ResponsiveDrawer);
