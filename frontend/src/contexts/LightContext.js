import React, { useState, createContext } from 'react';
import Radium from 'radium';

export const LightContext = createContext();

function LightContextProvider(props) {
  // true = light; false = dark
  const [themeBool, setThemeBool] = useState(true);
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

  const themeMode = themeBool ? theme.light : theme.dark;

  const handleThemeToggle = e => {
    e.preventDefault();
    setThemeBool(!themeBool);
  };

  return (
    <LightContext.Provider value={{ themeMode, themeBool, handleThemeToggle }}>
      {props.children}
    </LightContext.Provider>
  );
}

var styles = {
  light: {
    background: ['linear-gradient(to right, #f0f0f1, #e2e2e3)', '#f0f0f1']
  },
  dark: {
    background: ['linear-gradient(to right, #404040, #313131)', '#404040']
  }
};

export default Radium(LightContextProvider);
