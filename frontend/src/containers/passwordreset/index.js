import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export default function PasswordReset() {
  const { themeMode, themeBool } = useContext(LightContext);
  const [email, setEmail] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    axios.get(`/api/users`).then(res => setAccounts(res.data));
  }, []);

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const emails = accounts.map(account => account.email);
    const exists = emails.indexOf(email) > -1;

    if (exists) {
      axios
        .post(`/rest-auth/password/reset/`, {
          email
        })
        .then(res => setMessage(res.data.detail))
        .catch(err => console.log(err.response.data));
    }
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
        {message ? <div className="success-message">{message}</div> : null}
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
