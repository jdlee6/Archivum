import React, { useContext } from 'react';
import { LightContext } from '../../contexts/LightContext';
import { GreySwitch } from '../pages/LookbookListView';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const { themeBool, handleThemeToggle } = useContext(LightContext);

  return (
    <div className="section-container">
      <br />
      <div className="switch-container">
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
            <FontAwesomeIcon icon={faSun} color="#EFD367" />
          ) : (
            <FontAwesomeIcon icon={faMoon} color="black" />
          )}
        </div>
      </div>
    </div>
  );
}
