import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import EditButton from '../EditButton';
import ThemeSwitch from '../ThemeSwitch';
import TabPanel from '../TabPanel';
import { LightContext } from '../../contexts/LightContext';

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
        @{username}
        <br />
        Bio: {profile.bio}
      </div>
      <div className="profile-edit">
        <EditButton />
      </div>
      <div className="profile-tabs">
        <TabPanel />
      </div>
    </div>
  );
}
