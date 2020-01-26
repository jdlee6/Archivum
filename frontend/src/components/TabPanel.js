import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LightContext } from '../contexts/LightContext';

export default function CenteredTabs() {
  const [value, setValue] = useState(0);
  const { themeBool, themeMode } = useContext(LightContext);

  const useStyles = makeStyles({
    paper: {
      flexGrow: 1,
      width: '90%',
      '@media (min-width:768px)': {
        width: '100%'
      },
      backgroundColor: themeBool ? '#e9e9e9' : '#444444',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: themeBool ? '#f1f1f1' : '#575757',
        transition: 'all .5s ease'
      },
      indicator: {
        backgroundColor: '#ffffff'
      }
    }
  });

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.paper}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label={<span style={{ color: themeMode.text }}> Brands </span>} />
        <Tab label={<span style={{ color: themeMode.text }}>Lookbooks</span>} />
        <Tab label={<span style={{ color: themeMode.text }}>Pictures</span>} />
      </Tabs>
    </Paper>
  );
}
