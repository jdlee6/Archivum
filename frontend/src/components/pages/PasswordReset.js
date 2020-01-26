import React, { useState, useContext } from 'react';
import ThemeSwitch from '../ThemeSwitch';
import { makeStyles } from '@material-ui/core/styles';
import { LightContext } from '../../contexts/LightContext';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export default function PasswordReset() {
  const { themeMode, themeBool } = useContext(LightContext);
  const [email, setEmail] = useState('');

  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        display: 'flex',
        justifyContent: 'center'
      }
    },
    paper: {
      maxWidth: 300,
      backgroundColor: themeBool ? '#e9e9e9' : '#444444',
      margin: `${theme.spacing(2)}px auto`,
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '3%',
      '&:hover': {
        backgroundColor: themeBool ? '#f1f1f1' : '#575757',
        transition: 'all .5s ease'
      }
    },
    header: {
      color: themeBool ? 'black' : 'white',
      textAlign: 'center',
      fontFamily: 'Cardo',
      fontSize: 20
    }
  }));

  const classes = useStyles();

  const handleChange = e => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // check if the email exists in the api

    // if so sned a password reset link via email

    // if not show error
  };

  return (
    <div>
      <div className="section-container">
        <br />
        <br />
        <div className="switch-container">
          <ThemeSwitch />
        </div>
      </div>
      <div className="form-container">
        <div className={classes.header}>Reset Password</div>
        <Paper className={classes.paper}>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              InputLabelProps={{
                style: {
                  color: themeMode.text,
                  fontFamily: 'Cardo'
                }
              }}
              InputProps={{
                style: { color: themeMode.text, fontFamily: 'Cardo' }
              }}
              id="standard-email-input"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <div className="button-container">
              <Button type="submit" variant="contained" color="inherit">
                Send Reset Password Link
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
