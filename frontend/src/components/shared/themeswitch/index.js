import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../../../contexts/LightContext';
import './styles.css';

export const GreySwitch = withStyles({
  switchBase: {
    color: 'white',
    '&$checked': {
      color: 'lightgreen'
    },
    '&$checked + $track': {
      backgroundColor: 'lightgreen'
    }
  },
  checked: {},
  track: {}
})(Switch);

export default function ThemeSwitch() {
  const { themeBool, handleThemeToggle } = useContext(LightContext);

  return (
    <div>
      <GreySwitch
        color="primary"
        checked={themeBool}
        onChange={handleThemeToggle}
        value="checkedA"
        size="small"
        inputProps={{ 'aria-label': 'inherit checkbox' }}
      />
      <div className="switch-icons">
        {themeBool ? (
          <FontAwesomeIcon icon={faSun} color="#ffdf32" />
        ) : (
          <FontAwesomeIcon icon={faMoon} color="white" />
        )}
      </div>
    </div>
  );
}
