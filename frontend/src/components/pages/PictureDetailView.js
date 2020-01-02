import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import history from '../../history';
import { ModalContext } from '../../contexts/ModalContext';
import { LightContext } from '../../contexts/LightContext';
import ImageModal from '../ImageModal';
import { GreySwitch } from '../pages/LookbookListView';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PictureDetailView(props) {
  const brand = props.match.params.brand;
  const season = props.match.params.season;
  const index = props.match.params.pic;
  const [lookbook, setLookbook] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { setModalToggle } = useContext(ModalContext);
  const { themeBool, handleThemeToggle } = useContext(LightContext);

  const handleViewChange = index => {
    // on swipe - change url
    const newPath = '/' + brand + '/' + season + '/' + index.toString();
    history.push(newPath);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/brands/${brand}/`)
      .then(res => setBrandName(res.data.name));
  }, [brand]);

  useEffect(() => {
    setModalToggle(true);
    axios
      .get(`http://localhost:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season, setModalToggle]);

  if (lookbook.length !== 0) {
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
          <ImageModal
            handleViewChange={handleViewChange}
            index={index}
            lookbook={lookbook}
            brand={brand}
            season={season}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading-msg" id="msg-loading-more">
        Loading
      </div>
    );
  }
}
