import React from 'react';
import Dropdown from '../ui/Dropdown/Dropdown';
import './styles.scss';

const Header = () => {

  return (
    <div className="header">
        <div className='header-wrapper'>
            <div className='header-info'>Info</div>
            <Dropdown />
        </div>
    </div>
  );
};

export default Header;
