import React from 'react';
import Dropdown from '../ui/Dropdown/Dropdown';
import Button from "../ui/Button/Button";
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const Header = () => {
  const navigate = useNavigate();

  const startNewChat = () => {
    const newConversationId = Date.now().toString(); 
    navigate(`/${newConversationId}`,  { state: { isNewChat: true, hasStartedConversation: false } });
  };

  return (
    <div className="header">
        <div className='header-wrapper'>
          <Button onClick={startNewChat} className="header-new-chat">
              New chat
            </Button>
            <div className='header-info'>Info</div>
            <Dropdown />
        </div>
    </div>
  );
};

export default Header;
