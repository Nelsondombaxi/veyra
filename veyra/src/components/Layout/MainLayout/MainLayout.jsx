import React, { useState } from 'react';
import './MainLayout.css';
import Sidebar from '../Sidebar/Sidebar.jsx';

const MainLayout = ({ children, user, activeTab, setActiveTab, onLock }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="main-layout-container">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLock={onLock} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <main className="content-viewport">
        <header className="mobile-header">
          <button 
            className={`hamburger-btn ${isSidebarOpen ? 'active' : ''}`} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="hamburger-box">
              <span className="line top"></span>
              <span className="line middle"></span>
              <span className="line bottom"></span>
            </div>
          </button>
          <span className="mobile-brand">VEYRA</span>
        </header>

        <div className="page-content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;