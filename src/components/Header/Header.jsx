import React from 'react';
import Dropdown from '../ui/Dropdown/Dropdown';
import Button from "../ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import Create from '../ui/Icons/Create';
import Support from '../ui/Icons/Support';
import Burger from '../ui/Icons/Burger';
import Share from '../ui/Icons/Share';
import './styles.scss';

const Header = ({toggleSidebar, themeSwitcher, hasStartedConversation}) => {
  const navigate = useNavigate();

  const startNewChat = () => {
    const newConversationId = Date.now().toString(); 
    navigate(`/${newConversationId}`,  { state: { isNewChat: true, hasStartedConversation: false } });
  };

    // Copy the current URL to the clipboard
    const handleShare = () => {
      const currentUrl = window.location.href; 
      navigator.clipboard.writeText(currentUrl)
    };



  return (
    <div className="header">
        <div className='header-wrapper'>
          <Button onClick={startNewChat} className="header-new-chat btn-transparent">
             <span>New chat</span>
              <Create />
          </Button>
          <Button onClick={toggleSidebar} className="header-burger btn-transparent">
            <Burger/>
          </Button>
          {themeSwitcher}
          {hasStartedConversation && 
          
          <div className='header-share'>
            <Button  onClick={handleShare} className='btn-transparent'>
              <Share />
            </Button>
          </div>
            }
            
          <div className='header-info'>
            <Support />
          </div>

          <div className='header-dropdown'>
            <Dropdown />
          </div>
        </div>
    </div>
  );
};

export default Header;
