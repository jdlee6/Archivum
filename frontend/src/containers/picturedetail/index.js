import React, { useEffect, useState, useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import history from '../../history';
import ImageModal from '../../components/imagemodal';
import { styles } from '../../components/imagegallery';
import ThemeSwitch from '../../components/shared/themeswitch';
import { ModalContext } from '../../contexts/ModalContext';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import '../picturelist/styles.css';

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
    const newPath = '/' + brand + '/' + season + '/' + index.toString();
    history.push(newPath);
  };

  useEffect(() => {
    axios
      .get(`/api/brands/${brand}/`)
      .then(res => setBrandName(res.data.name));
  }, [brand]);

  useEffect(() => {
    setModalToggle(true);
    axios
      .get(`/api/brands/${brand}/lookbooks/${season}/`)
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
