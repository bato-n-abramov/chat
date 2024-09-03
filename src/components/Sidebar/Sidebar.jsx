import React, { useState, useEffect } from 'react';
import Button from "../ui/Button/Button";
import './styles.scss';

const Sidebar = ({ isOpen, toggleSidebar, startNewChat }) => {
  const sidebarWidth = '300px'; 
  const [conversations, setConversations] = useState([]);

  const loadConversationMetadata = () => {
    const storedConversations = localStorage.getItem('conversationMetadata');
    return storedConversations ? JSON.parse(storedConversations) : [];
  };


  useEffect(() => {
    const metadata = loadConversationMetadata();
    setConversations(metadata);
  }, [isOpen]);

  const handleConversationClick = (conversationId) => {
    console.log("Selected conversation ID:", conversationId);
  };

  return (
    <div
      className="sidebar"
      style={{
        width: isOpen ? sidebarWidth : '0',
        overflowY: 'auto', // Ensure content is scrollable if it overflows
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
          {conversations.length > 0 ? (
            <ul className="conversation-list">
              {conversations.map((conversation) => (
                <li
                  key={conversation.id}
                  className="conversation-item"
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <strong>{conversation.title || 'Untitled'}</strong>
                  <div className="conversation-preview">
                    {conversation.create_time}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No conversations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
