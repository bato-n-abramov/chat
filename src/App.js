import './App.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startNewChat = () => {
    setIsNewChat(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <ThemeSwitcher />
          <div className="layout">
            <Sidebar 
              isOpen={isSidebarOpen} 
              toggleSidebar={toggleSidebar} 
              startNewChat={startNewChat}
            />
            <Main 
              isSidebarOpen={isSidebarOpen} 
              isNewChat={isNewChat} 
              setIsNewChat={setIsNewChat} 
            />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
