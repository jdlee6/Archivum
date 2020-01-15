import React, { useState, useEffect, useContext } from 'react';
import ThemeSwitch from '../ThemeSwitch';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { LightContext } from '../../contexts/LightContext';
import TabPanel from '../TabPanel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0)
    }
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

export default function Profile() {
  const username = localStorage.getItem('username');
  const [profile, setProfile] = useState({});
  const { themeMode } = useContext(LightContext);
  const classes = useStyles();

  // profile.avatar, profile.bio
  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/users/${username}/`)
      .then(res => setProfile(res.data.profile));
  }, [username]);

  // console.log(user);
  // console.log(profile);

  return (
    <div className="section-container">
      <br />
      <br />
      <div className="switch-container">
        <ThemeSwitch />
      </div>
      <div className="profile-image-container">
        <Avatar src={profile.avatar} className={classes.large} />
      </div>
      <div className="profile-info" style={{ color: themeMode.text }}>
        User: {username}
        <br />
        Bio: {profile.bio}
      </div>
      <div className="profile-tabs">
        <TabPanel />
      </div>
    </div>
  );
}
// add tabs for liked brands, lookbooks, pictures
