import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import history from '../../history';

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
    email: '',
    password: ''
  });

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
    axios
      .post(`http://localhost:8000/api/users/register/`, {
        username: username,
        email: email,
        password: password
      })
      .then(res => console.log(res.data))
      .catch(err => {
        if (err.response) {
          // console.log(err.response.data);
          console.log(err.response.data.username);
          console.log(err.response.data.email);
        }
      });
    reset();

    // redirect to log in page
    history.push('/login');
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
          id="standard-email-input"
          label="Email"
          name="email"
          value={values.email}
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}

// return ;
