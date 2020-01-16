import React, { useContext } from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { LightContext } from '../contexts/LightContext';

const useStyles = makeStyles(theme => ({
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

function EditProfile(props) {
  const { children } = props;

  const handleClick = e => {
    console.log('hi');
  };

  return (
    <div onClick={handleClick} role="presentation">
      {children}
    </div>
  );
}

export default function EditButton(props) {
  const { themeBool } = useContext(LightContext);
  const classes = useStyles();

  return (
    <div>
      <EditProfile {...props}>
        <Fab
          variant="extended"
          className={themeBool ? classes.fabLight : classes.fabDark}
          size="small"
          aria-label="edit profile"
        >
          <EditIcon fontSize="inherit" label="edit" />
        </Fab>
      </EditProfile>
    </div>
  );
}
