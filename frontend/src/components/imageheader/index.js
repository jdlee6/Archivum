import React, { useState, useEffect } from 'react';
import { faHeart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './styles.css';

export default function ImageHeader({ currentIndex, views, modalProps }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [liked, setLiked] = useState('');
  const { onClose } = modalProps;
  const index = parseInt(currentIndex);
  const uuid = views[index].uuid;
  const season = views[index].lookbook_season;
  const brand = views[index].brand_url_param;

  useEffect(() => {
    if (username !== null) {
      axios.get(`/api/users/${username}/`).then(res => {
        const likedPhotos = res.data.likes;
        const uuids = likedPhotos.map(photo => photo.uuid);
        const exists = uuids.indexOf(uuid) > -1;
        setLiked(exists);
      });
    }
  }, [index, username, uuid]);

  const handleClick = e => {
    e.preventDefault();
    if (isLoggedIn === null) {
      window.location.href = '/login';
    } else {
      axios
        .get(`/api/brands/${brand}/lookbooks/${season}/${uuid}/like/`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        })
        .then(res => {
          setLiked(res.data.liked);
        })
        .catch(err => console.log(err.response));
    }
  };

  return (
    <div className="icon-menu">
      <ul>
        <li>
          {liked ? (
            <FontAwesomeIcon
              icon={faHeart}
              color="pink"
              onClick={handleClick}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              color="white"
              onClick={handleClick}
            />
          )}
        </li>
        <li>
          <FontAwesomeIcon
            icon={faTimesCircle}
            color="white"
            onClick={onClose}
          />
        </li>
      </ul>
    </div>
  );
}
