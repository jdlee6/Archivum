import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import EditButton from '../EditButton';
import TabPanel from '../TabPanel';
import ThemeSwitch from '../ThemeSwitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';

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

export default function Profile({ history }) {
  const username = localStorage.getItem('username');
  const [values, setValues] = useState({
    avatar: null,
    bio: null,
    location: null
  });
  const [dateJoined, setDateJoined] = useState('');
  const { themeMode } = useContext(LightContext);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/users/${username}/`)
      .then(res => setValues(res.data.profile));
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
          <Avatar src={values.avatar} className={classes.large} />
        </div>
        <div className="profile-info" style={{ color: themeMode.text }}>
          @{username}
          <br />
          Bio: {values.bio}
          <br />
          Location: {values.location}
          <br />
          Joined: {dateJoined}
        </div>
        <div className="profile-edit">
          <EditButton history={history} />
        </div>
        <div className="profile-tabs">
          <TabPanel />
        </div>
      </div>
    </div>
  );
}
