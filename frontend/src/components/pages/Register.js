import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

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
      .post(`http://192.168.1.18:8000/api/users/register/`, {
        username: username,
        email: email,
        password: password
      })
      .then(res => console.log(res.data));
    reset();

    // redirect to log in page
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
          Submit
        </Button>
      </form>
    </div>
  );
}

// return ;
