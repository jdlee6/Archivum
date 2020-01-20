import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import history from '../../history';
import { ModalContext } from '../../contexts/ModalContext';
import { LightContext } from '../../contexts/LightContext';
import ImageModal from '../ImageModal';
import { CircularProgress } from '@material-ui/core';
import { styles } from '../ImageGallery';
import ThemeSwitch from '../ThemeSwitch';

export default function PictureDetailView(props) {
  const brand = props.match.params.brand;
  const season = props.match.params.season;
  const index = props.match.params.pic;
  const [lookbook, setLookbook] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { setModalToggle } = useContext(ModalContext);
  const { themeBool } = useContext(LightContext);
  const classes = styles();

  const handleViewChange = index => {
    // on swipe - change url
    const newPath = '/' + brand + '/' + season + '/' + index.toString();
    history.push(newPath);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/brands/${brand}/`)
      .then(res => setBrandName(res.data.name));
  }, [brand]);

  useEffect(() => {
    setModalToggle(true);
    axios
      .get(`http://192.168.1.18:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season, setModalToggle]);

  if (lookbook.length !== 0) {
    return (
      <div>
        <div className="section-container">
          <div
            className={
              themeBool
                ? 'brand-season-header-light'
                : 'brand-season-header-dark'
            }
          >
            {brandName}
            <br />
            {season}
          </div>
          <div className="switch-container">
            <ThemeSwitch />
          </div>
        </div>
        <div className="image-padding">
          <ImageModal
            handleViewChange={handleViewChange}
            index={index}
            lookbook={lookbook}
            brand={brand}
            season={season}
            history={history}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading-msg" id="msg-loading-more">
        <CircularProgress
          disableShrink
          className={classes.bottom}
          size={15}
          thickness={4}
        />
      </div>
    );
  }
}
