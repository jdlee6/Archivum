import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../../contexts/AuthContext';
import { LightContext } from '../../contexts/LightContext';
import ThemeSwitch from '../ThemeSwitch';
import { checkAuthTimeout } from '../../utils';

export default function Login({ history }) {
  const [state, authDispatch] = useContext(AuthContext);
  const { themeMode, themeBool } = useContext(LightContext);
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    state.userError = null;
    state.passwordError = null;
  }, [state]);

  // define styles after themeBool
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
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const reset = () => {
    setValues({
      username: '',
      password: ''
    });
  };

  const checkAuthTimeout = expirationTime => {
    setTimeout(() => {
      authDispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('expirationDate');
    }, expirationTime * 1000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = values;
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

    authDispatch({
      type: 'AUTH_START'
    });
    axios
      .post(`http://192.168.1.18:8000/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('expirationDate', expirationDate);
        authDispatch({
          type: 'AUTH_SUCCESS',
          token,
          username
        });
        history.push('/');
        checkAuthTimeout(3600);
      })
      .catch(err => {
        // console.log(err.response.data);
        const userError = err.response.data.non_field_errors;
        const passwordError = err.response.data.password;
        authDispatch({
          type: 'AUTH_FAIL',
          userError,
          passwordError
        });
      });
    reset();
  };

  return (
    <div className="section-container">
      <br />
      <br />
      <div className="switch-container">
        <ThemeSwitch />
      </div>
      <div className="form-container">
        <div className={classes.header}>Log In</div>
        <Paper className={classes.paper}>
          <form className={classes.root} onSubmit={handleSubmit}>
            {state.userError ? (
              <div className="error-message">{state.userError}</div>
            ) : null}
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
              id="standard-username-input"
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
            />

            <TextField
              InputLabelProps={{
                style: { color: themeMode.text, fontFamily: 'Cardo' }
              }}
              InputProps={{
                style: { color: themeMode.text, fontFamily: 'Cardo' }
              }}
              id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {state.passwordError ? (
              <p className="field-error">{state.passwordError}</p>
            ) : null}

            <div className="button-container">
              <Button type="submit" variant="contained" color="inherit">
                Log In
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
