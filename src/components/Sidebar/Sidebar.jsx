import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../ui/Button/Button";
import CryptoInfo from '../CryptoInfo/CryptoInfo';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import './styles.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const sidebarWidth = '300px'; 
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null); 

  const startNewChat = () => {
    const newConversationId = Date.now().toString(); 
    navigate(`/${newConversationId}`,  { state: { isNewChat: true } });
  };

  const loadConversationContent = () => {
    const storedConversations = localStorage.getItem('conversations');
    const conversations = storedConversations ? JSON.parse(storedConversations) : {};
    return conversations || [];
  };

  const categorizeConversationDate = (timestamp) => {
    const today = new Date();
    const conversationDate = new Date(parseInt(timestamp));
  
    const isToday = 
      conversationDate.getDate() === today.getDate() &&
      conversationDate.getMonth() === today.getMonth() &&
      conversationDate.getFullYear() === today.getFullYear();
  
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
  
    const isLast7Days = conversationDate >= sevenDaysAgo && !isToday;
  
    if (isToday) return 'Today';
    if (isLast7Days) return 'Last 7 Days';
    return 'Earlier';
  };


  useEffect(() => {
    const metadata = loadConversationContent();
    setConversations(metadata);
  }, [isOpen]);

  const handleConversationClick = (conversationId) => {
    setActiveConversationId(conversationId);
    navigate(`/${conversationId}`);
  };

  const conversationKeys = Object.keys(conversations);

    const groupedConversations = conversationKeys.reduce((acc, key) => {
      const category = categorizeConversationDate(key);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ id: key, messages: conversations[key] });
      return acc;
    }, {});

    return (
      <div
        className="sidebar"
        style={{
          width: isOpen ? sidebarWidth : '0',
          overflowY: 'auto',
        }}
      >
        <div className='sidebar-wrapper'>
          <div className='sidebar-header'>
            <Button onClick={toggleSidebar} className="sidebar-close">
              Toggler
            </Button>
            <Button onClick={startNewChat} className="sidebar-new-chat">
              New chat
            </Button>
          </div>
  
          <div className='sidebar-content' 
            style={{
              visibility: isOpen ? 'visible' : 'hidden',
            }}
          >
              {Object.keys(groupedConversations).length > 0 ? (
                <ul className="conversation-list">
                  {Object.keys(groupedConversations).map((dateLabel) => (
                    <React.Fragment key={dateLabel}>
                      <li className="conversation-date-label">{dateLabel}</li>
                      {groupedConversations[dateLabel].map((conversation) => {
                        const firstMessage = conversation.messages[0];
                        const title = firstMessage ? firstMessage.content.slice(0, 20) : 'Untitled'; 
                        const isActive = conversation.id === activeConversationId;
  
                        return (
                          <li
                            key={conversation.id}
                            className={`conversation-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleConversationClick(conversation.id)}
                          >
                            <strong>{title}</strong>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <div>...</div>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                                    <DropdownMenu.Item shortcut="⌘ D">Delete</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                          </li>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </ul>
              ) : (
                <p>No conversations yet.</p>
              )}
          </div>
          <CryptoInfo className={ isOpen ? 'visible' : 'hidden'} />
        </div>
      </div>
    );
};

export default Sidebar;
