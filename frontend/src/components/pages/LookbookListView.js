import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LightContext } from '../../contexts/LightContext';
import { GreySwitch } from './PicturesListView';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export default function LookbookListView({ match }) {
  const brand = match.params.brand;
  const [lookbooks, setLookbooks] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { themeMode, themeBool, handleThemeToggle } = useContext(LightContext);

  // define styles after themeBool
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3)
    },
    paper: {
      maxWidth: 300,
      margin: `${theme.spacing(2)}px auto`,
      padding: theme.spacing(2),
      backgroundColor: themeBool ? '#e9e9e9' : '#444444',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: themeBool ? '#f1f1f1' : '#575757',
        transition: 'all .5s ease'
      }
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/brands/${brand}/`)
      .then(res => setLookbooks(res.data.lookbooks));
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.1.18:8000/api/brands/${brand}/`)
      .then(res => setBrandName(res.data.name));
  }, [brand]);

  return (
    <div>
      <div className="section-container">
        <div
          className={
            themeBool ? 'brand-season-header-light' : 'brand-season-header-dark'
          }
        >
          {brandName}
        </div>
        <div className="switch-container-lookbook">
          <GreySwitch
            color="primary"
            checked={themeBool}
            onChange={handleThemeToggle}
            size="small"
            inputProps={{
              'aria-label': 'inherit checkbox'
            }}
          />
          <div className="switch-icons">
            {themeBool ? (
              <FontAwesomeIcon icon={faSun} color="#ffdf32" />
            ) : (
              <FontAwesomeIcon icon={faMoon} color="white" />
            )}
          </div>
        </div>
        <div className="season-pad">
          <div className="season-containers">
            {lookbooks.map(lookbook => (
              <Paper key={lookbook.id} className={classes.paper}>
                <Grid item xs>
                  <Typography>
                    <Link
                      style={{
                        color: themeMode.text,
                        textDecoration: 'none'
                      }}
                      to={`${brand}/${lookbook.season}`}
                    >
                      <span>{lookbook.season.toUpperCase()}</span>
                    </Link>
                  </Typography>
                </Grid>
              </Paper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
