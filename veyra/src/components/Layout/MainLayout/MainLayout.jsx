import React from 'react';
import Sidebar from '../Sidebar/Sidebar'; 
import './MainLayout.css'; 

const MainLayout = ({ children, user, activeTab, setActiveTab }) => {
  return (
    <div className="main-layout-container">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <main className="content-viewport with-sidebar">
        {children}
      </main>
    </div>
  )
}

export default MainLayout;