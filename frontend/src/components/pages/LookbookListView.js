import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ImageGallery from '../ImageGallery';
import { LightContext } from '../../contexts/LightContext';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GreySwitch = withStyles({
  switchBase: {
    color: 'white',
    '&$checked': {
      color: 'lightgreen'
    },
    '&$checked + $track': {
      backgroundColor: 'lightgreen'
    }
  },
  checked: {},
  track: {}
})(Switch);

export default function LookbookListView({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;
  const [lookbook, setLookbook] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { themeBool, handleThemeToggle } = useContext(LightContext);

  // url parameter of brand
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season]);

  // actual name of the brand
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/brands/${brand}/`)
      .then(res => setBrandName(res.data.name));
  }, [brand]);

  if (!(lookbook.length === 0)) {
    return (
      <div>
        <div className="section-container">
          <div className="brand-season-header">
            {brandName}
            <br />
            {season}
          </div>
          <div className="switch-container">
            <GreySwitch
              color="primary"
              checked={themeBool}
              onChange={handleThemeToggle}
              value="checkedA"
              size="small"
              inputProps={{ 'aria-label': 'inherit checkbox' }}
            />
            <div className="switch-icons">
              {themeBool ? (
                <FontAwesomeIcon icon={faSun} color="#EFD367" />
              ) : (
                <FontAwesomeIcon icon={faMoon} color="black" />
              )}
            </div>
          </div>
        </div>
        <div className="image-padding">
          <ImageGallery lookbook={lookbook} />
        </div>
      </div>
    );
  } else {
    return <CircularProgress />;
  }
}
