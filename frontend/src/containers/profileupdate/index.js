import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export default function ProfileUpdate({ history }) {
  const { themeMode, themeBool } = useContext(LightContext);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const [values, setValues] = useState({
    username: null,
    email: null,
    date_joined: null,
    bio: null,
    avatar: null,
    location: null
  });

  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2, 8),
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
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    axios.get(`/api/users/${username}`).then(res =>
      setValues({
        username: res.data.username,
        email: res.data.email,
        date_joined: res.data.date_joined,
        bio: res.data.profile.bio,
        location: res.data.profile.location,
        avatar: res.data.profile.avatar
      })
    );
  }, [username]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = e => {
    setValues({
      ...values,
      avatar: e.target.files[0]
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('username', values.username);
    form_data.append('email', values.email);
    form_data.append('bio', values.bio);
    form_data.append('location', values.location);
    if (document.getElementById('avatar').value !== '') {
      form_data.append('avatar', values.avatar);
    }

    console.log(form_data);
    axios
      .put(
        `/api/users/${username}/update/`,
        form_data,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'multipart/form-data',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        console.log('success', res.data);
      })
      .catch(err => console.log(err));

    history.push('/profile');
    window.location.reload();
  };

  if (values.username !== null) {
    return (
      <div>
        <div className="section-container">
          <br />
          <br />
          <div className="switch-container">
            <ThemeSwitch />
          </div>
        </div>
        <div className={classes.header}>Edit Profile</div>
        <Paper className={classes.paper}>
          <form className={classes.root} onSubmit={handleSubmit}>
            <div className="profile-edit-avatar">
              <Avatar src={values.avatar} className={classes.large} />

              <label htmlFor="avatar">
                <input
                  style={{ visibility: 'hidden' }}
                  id="avatar"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
                <Button
                  component="span"
                  type="submit"
                  variant="contained"
                  color="inherit"
                >
                  Upload
                </Button>
              </label>
            </div>

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
              value={values.email}
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
              id="standard-multiline-flexible"
              label="Bio"
              name="bio"
              multiline
              rows="3"
              value={values.bio}
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
              id="standard-location-input"
              label="Location"
              name="location"
              value={values.location}
              onChange={handleChange}
            />

            <div className="button-container">
              <Button type="submit" variant="contained" color="inherit">
                Update
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  } else {
    return (
      <CircularProgress
        disableShrink
        className={classes.bottom}
        size={15}
        thickness={4}
      />
    );
  }
}
