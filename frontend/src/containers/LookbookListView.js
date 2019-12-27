import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%'
  }
}));

export default function LookbookListView({ match }) {
  const brand = match.params.brand;
  const season = match.params.season;

  const classes = useStyles();

  // refactor into gallery component with mui grid list
  const [lookbook, setLookbook] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/brands/${brand}/lookbooks/${season}/`)
      .then(res => setLookbook(res.data));
  }, [brand, season]);

  if (!(lookbook.length === 0)) {
    return (
      <div className="image-padding">
        <GridList cellHeight={180} className={classes.gridList} cols={2}>
          {lookbook.pictures.map(picture => (
            <GridListTile key={picture.uuid} cols={1}>
              <img src={picture.photo} alt="huh" />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  } else {
    return <CircularProgress />;
  }
}
