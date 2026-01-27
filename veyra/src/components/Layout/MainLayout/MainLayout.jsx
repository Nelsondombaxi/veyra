import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './MainLayout.css'

const MainLayout = ({ children, user }) => {
  return (
    <div className="main-layout">
      <Sidebar user={user} />
      <main className="content-area">
        {children}
      </main>
    </div>
  )
}

export default MainLayout