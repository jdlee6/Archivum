import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
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

export default function UserProfile({ match }) {
  const username = match.params.username;
  const [profile, setProfile] = useState({});
  const [dateJoined, setDateJoined] = useState('');
  const { themeMode } = useContext(LightContext);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/users/${username}/`)
      .then(res => setProfile(res.data.profile));
  }, [username]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/users/${username}/`)
      .then(res => setDateJoined(res.data.date_joined));
  }, [username]);

  return (
    <div>
      <div className="section-container">
        <br />
        <br />
        <div className="switch-container">
          <ThemeSwitch />
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-image-container">
          <Avatar src={profile.avatar} className={classes.large} />
        </div>
        <div className="profile-info" style={{ color: themeMode.text }}>
          @{username}
          <br />
          Bio: {profile.bio}
          <br />
          Joined: {dateJoined}
        </div>
        <div className="profile-tabs">
          <TabPanel />
        </div>
      </div>
    </div>
  );
}
