import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    minWidth: '100%',
    minHeight: '100%'
  }
}));

export default function Gallery(props) {
  const classes = useStyles();

  const handleClick = () => {
    console.log('redirecting...');
  };

  return (
    <div className="image-padding">
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={2}>
          {props.lookbook.pictures.map(picture => (
            <GridListTile key={picture.uuid} cols={1}>
              <img onClick={handleClick} src={picture.photo} alt="huh" />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}
