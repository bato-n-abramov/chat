import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Intro from '../Intro/Intro';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessageWindow from '../ChatMessageWindow/ChatMessageWindow';
import Header from '../Header/Header';
import './styles.scss';

const Main = ({ isSidebarOpen, isNewChat, toggleSidebar }) => {
  const { cId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [messageInProgress, setMessageInProgress] = useState("");
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const location = useLocation();
  const isNewChatFromState = location.state?.isNewChat;


  const markdownContent = `  
  \`\`\`Html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Title</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
        }
        header {
            background: #333;
            color: #fff;
            padding-top: 30px;
            min-height: 70px;
            border-bottom: #fff 3px solid;
        }
        header h1 {
            text-align: center;
            margin: 0;
        }
        .article {
            background: #fff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  \`\`\`
  `;

  const table = `
  Here is table example
  | Fruit    | Taste    | Common Uses |
  |----------|----------|-----------
  | Apple    | Sweet/Tart| Snacks, baking, salads |
  | Banana   | Sweet   |  Snacks, smoothies, baking |
  | Orange   | Citrus   | Juices, snacks, salads |
  | Strawberry| Sweet/Tart| Desserts, salads, smoothies |
  | Grape   | Sweet/Tart   | Snacks, juices, salads |
  | Apple   | Sweet/Tart   | Snacks, baking, salads |
  | Orange   | Citrus   | Juices, snacks, salads |
  `
  

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
    markdown: [markdownContent],
    table: [table],
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
    } else if (userPrompt.toLowerCase().includes("table")) {
      category = "table"; 
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
      <Header  toggleSidebar={toggleSidebar} />
      {shouldShowIntro && !hasStartedConversation && <Intro />}
      <ChatMessageWindow messages={messages} messageInProgress={messageInProgress} />
      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  );
};

export default Main;
