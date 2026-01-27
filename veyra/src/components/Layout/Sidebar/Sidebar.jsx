import React from 'react'
import './Sidebar.css'

const Sidebar = ({ user }) => {
  return (
    <aside className="veyra-sidebar">
      <div className="sidebar-logo">
        <h2>VEYRA</h2>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item active">Dashboard</div>
        <div className="nav-item">Calendário</div>
        <div className="nav-item">Financeiro</div>
      </nav>

      <div className="sidebar-profile">
        <img src={user?.avatar} alt="User" className="mini-avatar" />
        <div className="user-info">
          <span>{user?.name}</span>
          <small>{user?.role}</small>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar