import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MenuTreeView from './MenuTreeView';
import { ModalContext } from '../contexts/ModalContext';
import { LightContext } from '../contexts/LightContext';
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

var drawerStyles = {
  light: {
    background: ['linear-gradient(to bottom, #f0f0f1, #e2e2e3)', '#f0f0f1']
  },
  dark: {
    background: ['linear-gradient(to bottom, #343434, #252525)', '#404040']
  }
};

const useStyles = makeStyles({
  paperDark: {
    background: drawerStyles.dark.background,
    color: 'white'
  },
  paperLight: {
    background: drawerStyles.light.background,
    color: 'black'
  }
});

function ResponsiveDrawer(props) {
  const { container } = props;
  const theme = useTheme();
  const styles = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { modalToggle } = useContext(ModalContext);
  const { themeMode, themeBool } = useContext(LightContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <div></div>;

  const drawerMode = themeBool
    ? { paper: styles.paperLight }
    : { paper: styles.paperDark };

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
            <div className="title" style={{ color: themeMode.text }}>
              Archivum
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
            <MenuTreeView />
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
