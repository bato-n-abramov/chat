import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import Switcher from '../ui/Switcher/Switcher';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="switch-mode" style={{ marginRight: '8px' }}>
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </label>
      <Switcher
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeSwitcher;
