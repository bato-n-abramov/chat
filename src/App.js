import './App.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
            />
            <Routes>
              <Route
                path=":cId"
                element={
                  <Main isSidebarOpen={isSidebarOpen}  />
                }
              />
              <Route
                path="/"
                element={
                  <Main isSidebarOpen={isSidebarOpen}  isNewChat={true} />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
