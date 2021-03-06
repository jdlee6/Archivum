import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ThemeSwitch from '../../components/shared/themeswitch';
import { LightContext } from '../../contexts/LightContext';
import axios from 'axios';
import './styles.css';

export default function LookbookList({ match }) {
  const brand = match.params.brand;
  const [lookbooks, setLookbooks] = useState([]);
  const [brandName, setBrandName] = useState('');
  const { themeMode, themeBool } = useContext(LightContext);

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
    axios.get(`/api/brands/${brand}/`).then(res => {
      setLookbooks(res.data.lookbooks);
      setBrandName(res.data.name);
    });
  }, [brand]);

  if (brandName !== '') {
    return (
      <div className="section-container-lookbook">
        <div
          className={
            themeBool ? 'brand-season-header-light' : 'brand-season-header-dark'
          }
        >
          {brandName}
        </div>
        <div className="switch-container-lookbook">
          <ThemeSwitch />
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
    );
  } else {
    return null;
  }
}
