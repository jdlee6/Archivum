import React, { useState, useEffect, useContext } from 'react';
import { LightContext } from '../../contexts/LightContext';
import { GreySwitch } from './PicturesListView';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Slider from 'react-slick';

export default function Home() {
  const [brands, setBrands] = useState([]);
  const { themeBool, handleThemeToggle } = useContext(LightContext);

  const settings = {
    fade: true,
    infinite: true,
    speed: 800,
    adaptiveHeight: true,
    rows: 1,
    slidePerRow: 1,
    autoplay: true,
    autoplaySpeed: 2250,
    pauseOnHover: true
  };

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/brands/`)
      .then(res => setBrands(res.data));
  }, []);

  // redirect user to lookpage when div is clicked
  const handleClick = e => {
    console.log(`redirect..`);
  };

  return (
    <div className="section-container">
      <br />
      <div className="switch-container">
        <GreySwitch
          color="primary"
          checked={themeBool}
          onChange={handleThemeToggle}
          size="small"
          inputProps={{ 'aria-label': 'inherit checkbox' }}
        />
        <div className="switch-icons">
          {themeBool ? (
            <FontAwesomeIcon icon={faSun} color="#ffdf32" />
          ) : (
            <FontAwesomeIcon icon={faMoon} color="white" />
          )}
        </div>
      </div>
      <div className="slick-pad">
        <Slider {...settings}>
          {brands.map(brand => (
            <div
              key={brand.id}
              className={
                themeBool ? 'slick-container-light' : 'slick-container-dark'
              }
              onClick={handleClick}
            >
              <h3>{brand.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
