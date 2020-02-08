import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ThemeSwitch from '../../components/shared/themeswitch';
import { AuthContext } from '../../contexts/AuthContext';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import '../login/styles.css';

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [state, authDispatch] = useContext(AuthContext);
  const { themeMode, themeBool } = useContext(LightContext);

  useEffect(() => {
    state.userError = null;
    state.passwordError = null;
  }, [state]);

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
      email: '',
      password: ''
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = values;
    authDispatch({
      type: 'AUTH_START'
    });
    axios
      .post(`http://192.168.1.18:8000/api/users/register/`, {
        username: username,
        email: email,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        authDispatch({
          type: 'AUTH_SUCCESS',
          payload: token
        });
        window.location.href = '/login/';
      })
      .catch(err => {
        console.log(err.response.data);

        if (err.response) {
          const userError = err.response.data.username;
          const passwordError = err.response.data.password;
          authDispatch({
            type: 'AUTH_FAIL',
            userError,
            passwordError
          });
        }
      });
    reset();
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
        <div className={classes.header}>Create your account</div>
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
              id="standard-username-input"
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            {state.userError ? (
              <p className="field-error">{state.userError}</p>
            ) : null}

            <TextField
              InputLabelProps={{
                style: { color: themeMode.text, fontFamily: 'Cardo' }
              }}
              InputProps={{
                style: { color: themeMode.text, fontFamily: 'Cardo' }
              }}
              id="standard-email-input"
              label="Email"
              name="email"
              value={values.email}
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
                Sign Up
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
