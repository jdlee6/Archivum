import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export default function PasswordChange({ match, history }) {
  const token = match.params.token;
  const uidb64 = match.params.uidb64;
  const { themeMode, themeBool } = useContext(LightContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState({
    password1: '',
    password2: ''
  });

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
      password1: '',
      password2: ''
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      password_1: values.password1,
      password_2: values.password2
    };
    axios
      .put(`http://192.168.1.18:8000/password/change/${uidb64}/${token}/`, data)
      .then(res => {
        setSuccessMessage(res.data.detail);
      })
      .catch(err => {
        setErrorMessage(err.response.data.detail);
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
        <div className={classes.header}>Change Password</div>
        {successMessage ? (
          <div className="success-message">{successMessage}</div>
        ) : (
          <div className="error-message">{errorMessage}</div>
        )}
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
              id="standard-password1-input"
              label="New password"
              type="password"
              name="password1"
              value={values.password1}
              onChange={handleChange}
            />
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
              id="standard-password2-input"
              label="Confirm password"
              type="password"
              name="password2"
              value={values.password2}
              onChange={handleChange}
            />
            <div className="button-container">
              <Button type="submit" variant="contained" color="inherit">
                Change Password
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
