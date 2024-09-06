import React from 'react';
import Dropdown from '../ui/Dropdown/Dropdown';
import Button from "../ui/Button/Button";
import { useNavigate } from 'react-router-dom';
import Create from '../ui/Icons/Create';
import Support from '../ui/Icons/Support';
import Burger from '../ui/Icons/Burger';
import './styles.scss';

const Header = ({toggleSidebar}) => {
  const navigate = useNavigate();

  const startNewChat = () => {
    const newConversationId = Date.now().toString(); 
    navigate(`/${newConversationId}`,  { state: { isNewChat: true, hasStartedConversation: false } });
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
