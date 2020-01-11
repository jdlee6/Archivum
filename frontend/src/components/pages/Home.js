import React, { useState, useEffect, useContext } from 'react';
import { LightContext } from '../../contexts/LightContext';
import { GreySwitch } from './PicturesListView';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function Home() {
  const [brands, setBrands] = useState([]);
  const { themeMode, themeBool, handleThemeToggle } = useContext(LightContext);

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

  console.log('Home route: this works!');

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
            >
              <Link
                style={{
                  color: themeMode.text,
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                to={`/${brand.url_param}`}
              >
                {brand.name}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
