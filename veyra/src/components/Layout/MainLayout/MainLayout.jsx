import React from 'react';
import Sidebar from '../Sidebar/Sidebar'; 
import './MainLayout.css'; 

const MainLayout = ({ children, user, activeTab, setActiveTab, onLock }) => {
  return (
    <div className="main-layout-container">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLock={onLock} 
      />
      <main className="content-viewport with-sidebar">
        {children}
      </main>
    </div>
  )
}

export default MainLayout;