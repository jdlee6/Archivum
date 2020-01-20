import React, { useState } from 'react';
import { faHeart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ImageHeader({ modalProps }) {
  const [likes, setLikes] = useState({
    liked: false,
    count: 0
  });
  const { onClose } = modalProps;

  const handleClick = e => {
    e.preventDefault();

    likes.liked ? setLikes({ liked: false }) : setLikes({ liked: true });

    console.log(likes);

    // change color of like icon
    // if not logged in -> send them to profile picture
    // else -> establish a relationship (backend)
  };

  return (
    <div className="icon-menu">
      <ul>
        <li>
          <FontAwesomeIcon icon={faHeart} color="white" onClick={handleClick} />
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
