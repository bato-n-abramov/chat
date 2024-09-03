import React, { useState, useEffect } from 'react';
import Intro from '../Intro/Intro';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessageWindow from '../ChatMessageWindow/ChatMessageWindow';
import './styles.scss';

const Main = ({ isSidebarOpen, isNewChat, setIsNewChat }) => {
  const [messages, setMessages] = useState([]);
  const [messageInProgress, setMessageInProgress] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [hasConversationStarted, setHasConversationStarted] = useState(false);

  const markdownContent = `
  # Sample Markdown Content
  
  ## Heading Level 2
  
  This is a paragraph with **bold text** and *italic text*. 
  
  Here is a list of items:
  - Item 1
  - Item 2
  - Item 3
  
  ### Heading Level 3
  
  You can also include [links](https://www.example.com) to external sites.
  
  #### Code Example
  
  Here is a code snippet in JavaScript:
  
  \`\`\`javascript
  const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
  };
  
  greet('World');
  \`\`\`
  
  #### Table Example
  
  | Header 1 | Header 2 |
  |----------|----------|
  | Row 1    | Data 1   |
  | Row 2    | Data 2   |
  `;
  

  const responses = {
    greetings: [
      "**Hello! How can I assist you today?**",
      "**Hi there! What would you like to know?**",
      "**Greetings! How can I help?**",
    ],
    farewell: [
      "Goodbye! Have a great day!",
      "See you later! Take care!",
      "Farewell! Come back if you have more questions!",
    ],
    default: [
      "I'm not sure how to respond to that.",
      "Could you please clarify your question?",
      "I'm here to help, but I didn't understand that.",
    ],
    markdown: [markdownContent] 
  };

  const saveConversationMetadata = (newConversation) => {
    const storedConversations = localStorage.getItem('conversationMetadata');
    const conversations = storedConversations ? JSON.parse(storedConversations) : [];
  
    conversations.push(newConversation);
    localStorage.setItem('conversationMetadata', JSON.stringify(conversations));
  };

  const saveConversationContent = (conversationId, messages) => {
    const storedConversations = localStorage.getItem('conversations');
    const conversations = storedConversations ? JSON.parse(storedConversations) : {};
  
    conversations[conversationId] = messages;
    localStorage.setItem('conversations', JSON.stringify(conversations));
  };

  const loadConversationMetadata = () => {
    const storedConversations = localStorage.getItem('conversationMetadata');
    return storedConversations ? JSON.parse(storedConversations) : [];
  };

  const loadConversationContent = (conversationId) => {
    const storedConversations = localStorage.getItem('conversations');
    const conversations = storedConversations ? JSON.parse(storedConversations) : {};
    return conversations[conversationId] || [];
  };

  useEffect(() => {
    if (isNewChat) {
      setMessages([]);
      setConversationId(Date.now().toString());
      setHasConversationStarted(false);
      setIsNewChat(false); // Reset the new chat flag
    } else {
      const metadata = loadConversationMetadata();
      if (metadata.length > 0) {
        const latestConversationId = metadata[metadata.length - 1].id;
        setMessages(loadConversationContent(latestConversationId));
        setConversationId(latestConversationId);
        setHasConversationStarted(true);
      }
    }
  }, [isNewChat]);

  const handleSendMessage = (userPrompt) => {
    if (!hasConversationStarted) {
      setHasConversationStarted(true);
    }

    const newMessages = [...messages, { id: Date.now().toString(), content: userPrompt, userId: 'user', type: 'user' }];
    let category = "default"; 
 
    if (userPrompt.toLowerCase().includes("hello")) {
      category = "greetings";
    } else if (userPrompt.toLowerCase().includes("bye")) {
      category = "farewell";
    } else if (userPrompt.toLowerCase().includes("markdown")) {
      category = "markdown"; 
    }
    
    const randomResponse =
      responses[category] ? responses[category][Math.floor(Math.random() * responses[category].length)] : responses["default"];

    const updatedMessages = [...newMessages, { id: Date.now().toString(), content: randomResponse, userId: 'bot', type: 'assistant' }];
    setMessages(updatedMessages);

    saveConversationMetadata({
      id: conversationId,
      title: `Conversation ${conversationId}`,
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      is_archived: false,
    });

    saveConversationContent(conversationId, updatedMessages);
    setConversationId(conversationId);

    setTimeout(() => {
      setMessageInProgress("");
    }, 1000);
  };

  return (
    <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
      {!hasConversationStarted && <Intro />}
      <ChatMessageWindow messages={messages} messageInProgress={messageInProgress} />
      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  );
};

export default Main;
