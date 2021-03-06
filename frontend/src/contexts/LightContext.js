import React, { useState, useEffect, createContext } from 'react';
import { Helmet } from 'react-helmet';
import Radium from 'radium';

export const LightContext = createContext();

function LightContextProvider(props) {
  // true = light; false = dark
  const [themeBool, setThemeBool] = useState(false);
  const [theme] = useState({
    light: {
      background: styles.light.background,
      maxHeight: '45px',
      text: 'black',
      icon: 'black'
    },
    dark: {
      background: styles.dark.background,
      maxHeight: '45px',
      text: 'white',
      icon: 'white'
    }
  });

  const handleThemeToggle = e => {
    e.preventDefault();
    if (themeBool === true) {
      setThemeBool(false);
      localStorage.setItem('theme', 'false');
    } else {
      setThemeBool(true);
      localStorage.setItem('theme', 'true');
    }
  };

  useEffect(() => {
    const isLight = localStorage.getItem('theme') === 'true';
    setThemeBool(isLight);
  }, [themeBool]);

  const themeMode = themeBool ? theme.light : theme.dark;

  return (
    <div>
      <LightContext.Provider
        value={{ themeMode, themeBool, handleThemeToggle }}
      >
        {props.children}
      </LightContext.Provider>
      <Helmet>
        {themeBool ? (
          <style>{'body {background-color: #ffffff }'}</style>
        ) : (
          <style>{`body {background-color: #404040 }`}</style>
        )}
      </Helmet>
    </div>
  );
}

var styles = {
  light: {
    background: ['linear-gradient(to right, #f0f0f1, #e2e2e3)', '#f0f0f1']
  },
  dark: {
    background: ['linear-gradient(to right, #313131, #252525)', '#252525']
  }
};

export default Radium(LightContextProvider);
