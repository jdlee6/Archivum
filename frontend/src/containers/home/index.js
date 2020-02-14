import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export default function Home() {
  const [brands, setBrands] = useState([]);
  const { themeMode, themeBool } = useContext(LightContext);

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
      .get(`/api/brands/`)
      .then(res => setBrands(res.data));
  }, []);

  return (
    <div className="section-container">
      <br />
      <br />
      <div className="switch-container">
        <ThemeSwitch />
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
