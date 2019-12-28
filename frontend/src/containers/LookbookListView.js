import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import Gallery from '../components/Gallery';

export default function LookbookListView({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;
  const [lookbook, setLookbook] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season]);

  if (!(lookbook.length === 0)) {
    return <Gallery lookbook={lookbook} />;
  } else {
    return <CircularProgress />;
  }
}
