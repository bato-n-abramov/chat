import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Intro from '../Intro/Intro';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessageWindow from '../ChatMessageWindow/ChatMessageWindow';
import Header from '../Header/Header';
import './styles.scss';

const Main = ({ isSidebarOpen, isNewChat }) => {
  const { cId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [messageInProgress, setMessageInProgress] = useState("");
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const location = useLocation();
  const isNewChatFromState = location.state?.isNewChat;


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
    markdown: [markdownContent] ,
    image: [
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    ],
    video: [
      "https://www.w3schools.com/html/mov_bbb.mp4", 
    ],
  };

  const saveConversationContent = (conversationId, messages) => {
    const storedConversations = localStorage.getItem('conversations');
    const conversations = storedConversations ? JSON.parse(storedConversations) : {};
    conversations[conversationId] = messages;
    localStorage.setItem('conversations', JSON.stringify(conversations));
  };

  const loadConversationContent = (conversationId) => {
    const storedConversations = localStorage.getItem('conversations');
    const conversations = storedConversations ? JSON.parse(storedConversations) : {};
    return conversations[conversationId] || [];
  };

  useEffect(() => {
    if (cId) {
      const existingMessages = loadConversationContent(cId);
      setMessages(existingMessages);
    }
  }, [cId]);

  useEffect(() => {
    if (isNewChatFromState ||!cId) {
      setMessages([]);
      setHasStartedConversation(false);
      setConversationId(Date.now().toString());

    } else if (cId) {
      const existingMessages = loadConversationContent(cId);
      setMessages(existingMessages);
      setConversationId(cId);
      setHasStartedConversation(existingMessages.length > 0); 

    } else {
      const metadata = loadConversationContent();
      if (metadata.length > 0) {
        const latestConversationId = metadata[metadata.length - 1].id;
        setMessages(loadConversationContent(latestConversationId));
        setConversationId(latestConversationId);
      }
    }
  }, [cId, isNewChatFromState]);

  const handleSendMessage = (userPrompt, attachedFiles) => {
    if (!hasStartedConversation) {
      setHasStartedConversation(true); 
    }
    const newMessages = [...messages, {content: userPrompt, images: attachedFiles, userId: 'user', type: 'user' }];
    let category = "default"; 
 
    if (userPrompt.toLowerCase().includes("hello")) {
      category = "greetings";
    } else if (userPrompt.toLowerCase().includes("bye")) {
      category = "farewell";
    } else if (userPrompt.toLowerCase().includes("markdown")) {
      category = "markdown"; 
    } else if (userPrompt.toLowerCase().includes("image")) {
      category = "image"; 
    } else if (userPrompt.toLowerCase().includes("video")) {
      category = "video"; 
    }
    
    const randomResponse =
      responses[category] ? responses[category][Math.floor(Math.random() * responses[category].length)] : responses["default"];
    const updatedMessages = [...newMessages, {content: randomResponse, userId: 'bot', type: 'assistant' }];
    setMessages(updatedMessages);

    saveConversationContent(conversationId, updatedMessages);
    setConversationId(conversationId);

    setTimeout(() => {
      setMessageInProgress("");
    }, 1000);
  };

  const shouldShowIntro = isNewChat || isNewChatFromState;

  console.log(cId, isNewChat, isNewChatFromState, hasStartedConversation);

  return (
    <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
      <Header />
      {shouldShowIntro && !hasStartedConversation && <Intro />}
      <ChatMessageWindow messages={messages} messageInProgress={messageInProgress} />
      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  );
};

export default Main;
