import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Typography';
import { LightContext } from '../contexts/LightContext';
import ProfileImageGallery from './ProfileImageGallery';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component={'span'}
      variant={'body2'}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default function CenteredTabs(props) {
  const { likedPhotos } = props;
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
    <div>
      <Paper className={classes.paper}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label={<span style={{ color: themeMode.text }}>Looks</span>} />
          <Tab label={<span style={{ color: themeMode.text }}>Brands</span>} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        Placeholder 1
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileImageGallery likedPhotos={likedPhotos} />
      </TabPanel>
    </div>
  );
}
