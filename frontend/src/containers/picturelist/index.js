import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import history from '../../history';
import ImageGallery, { styles } from '../../components/imagegallery';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export default function PictureList({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;
  const [lookbook, setLookbook] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { themeBool } = useContext(LightContext);
  const classes = styles();

  useEffect(() => {
    axios
      .get(`/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season]);

  useEffect(() => {
    axios
      .get(`/api/brands/${brand}/`)
      .then(res => setBrandName(res.data.name));
  }, [brand]);

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
        </div>
        <div className="switch-container">
          <ThemeSwitch />
        </div>
        <div className="image-padding">
          <ImageGallery
            lookbook={lookbook}
            history={history}
            season={season}
            brand={brand}
            match={match}
          />
        </div>
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
