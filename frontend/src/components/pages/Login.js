import React, { useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function Register() {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const { handleAuth } = useContext(AuthContext);

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
    handleAuth();
    axios
      .post(`http://localhost:8000/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        localStorage.setItem('token', res.data.key);
        console.log('token is set!');
      })
      .catch(err => {
        if (err.response) {
          // console.log(err.response.data);
          console.log(err.response.data.username);
        }
      });
    reset();

    // redirect to home page and refresh page
  };

  return (
    <div className="section-container">
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="standard-username-input"
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" color="inherit">
          Login
        </Button>
      </form>
    </div>
  );
}

// return ;
