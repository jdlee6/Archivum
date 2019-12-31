import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import ImageGallery from '../ImageGallery';

export default function LookbookListView({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;
  const [lookbook, setLookbook] = useState([]);
  const [brandName, setBrandName] = useState('');

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
