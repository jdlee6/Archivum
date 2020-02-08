import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Zoom from '@material-ui/core/Zoom';
import { LightContext } from '../../contexts/LightContext';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(2)
  },
  fabLight: {
    backgroundColor: '#f0f0f1',
    color: 'black',
    '&:hover': {
      backgroundColor: '#e2e2e3'
    }
  },
  fabDark: {
    backgroundColor: '#333333',
    color: 'white',
    '&:hover': {
      backgroundColor: '#454545'
    }
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '.section-container'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default function BackToTop(props) {
  const classes = useStyles();
  const { themeBool } = useContext(LightContext);

  return (
    <React.Fragment>
      <ScrollTop {...props}>
        <Fab
          variant="extended"
          className={themeBool ? classes.fabLight : classes.fabDark}
          size="small"
          aria-label="scroll back to top"
        >
          <ArrowUpwardIcon fontSize="inherit" />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
