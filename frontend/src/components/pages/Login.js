import React, { useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../../contexts/AuthContext';
import { LightContext } from '../../contexts/LightContext';
import { GreySwitch } from './PicturesListView';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
  const [state, authDispatch] = useContext(AuthContext);
  const { themeMode, themeBool, handleThemeToggle } = useContext(LightContext);

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

  const [values, setValues] = useState({
    username: '',
    password: ''
  });

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

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = values;
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
        localStorage.setItem('isLoggedIn', 'true');
        authDispatch({
          type: 'AUTH_SUCCESS',
          payload: token
        });
      })
      .catch(err => {
        console.log(err.response.data.non_field_errors[0]);
        authDispatch({
          type: 'AUTH_FAIL',
          payload: err
        });
      });
    reset();

    // redirect to home page and refresh page
  };

  return (
    <div>
      <div className="section-container">
        <div className="switch-container-lookbook">
          <GreySwitch
            color="primary"
            checked={themeBool}
            onChange={handleThemeToggle}
            size="small"
            inputProps={{
              'aria-label': 'inherit checkbox'
            }}
          />
          <div className="switch-icons">
            {themeBool ? (
              <FontAwesomeIcon icon={faSun} color="#ffdf32" />
            ) : (
              <FontAwesomeIcon icon={faMoon} color="white" />
            )}
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className={classes.header}>Log In</div>
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
