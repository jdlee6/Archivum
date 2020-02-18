import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export const styles = makeStyles({
  loading: {
    color: '#b8caff',
    animationDuration: '550ms',
    marginTop: '200px',
    marginRight: '10px',
    '@media (min-width:768px)': {
      color: '#b8caff',
      animationDuration: '550ms',
      marginTop: '200px',
      marginRight: '60px'
    }
  }
});

export default function Home() {
  const [brands, setBrands] = useState([]);
  const { themeMode, themeBool } = useContext(LightContext);
  const classes = styles();

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
    axios.get(`/api/brands/`).then(res => setBrands(res.data));
  }, []);

  return (
    <div className="section-container">
      <br />
      <br />
      <div className="switch-container">
        <ThemeSwitch />
      </div>
      {brands.length !== 0 ? (
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
      ) : (
        <div className="loading-msg" id="msg-loading-more">
          <CircularProgress
            disableShrink
            className={classes.loading}
            size={15}
            thickness={4}
          />
        </div>
      )}
    </div>
  );
}
