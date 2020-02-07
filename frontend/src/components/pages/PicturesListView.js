import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import history from '../../history';
import ImageGallery from '../ImageGallery';
import { styles } from '../ImageGallery';
import ThemeSwitch from '../ThemeSwitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';

export default function PicturesListView({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;
  const [lookbook, setLookbook] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { themeBool } = useContext(LightContext);
  const classes = styles();

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/brands/${brand}/`)
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
