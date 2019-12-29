import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import ImageGallery from '../components/ImageGallery';

export default function LookbookListView({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;
  const [lookbook, setLookbook] = useState([]);

  // console.log(match.params);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season]);

  if (!(lookbook.length === 0)) {
    return (
      <div>
        <div className="section-container">
          <div className="brand-season-header">
            {brand} {season}
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
