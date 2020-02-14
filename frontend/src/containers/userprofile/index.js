import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CenteredTabs from '../../components/centeredtabs';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import '../myprofile/styles.css';

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
  const [dateJoined, setDateJoined] = useState('');
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [values, setValues] = useState({
    avatar: null,
    bio: null,
    location: null
  });
  const { themeMode } = useContext(LightContext);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`/api/users/${username}/`).then(res => {
      setDateJoined(res.data.date_joined);
      setLikedPhotos(res.data.likes);
      setValues(res.data.profile);
    });
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
          Joined: {dateJoined}
        </div>
        <div className="profile-tabs">
          <CenteredTabs likedPhotos={likedPhotos} />
        </div>
      </div>
    </div>
  );
}
