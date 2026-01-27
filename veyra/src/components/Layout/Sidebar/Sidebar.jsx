import React from 'react'
import './Sidebar.css'
import { PiSquaresFourBold, PiCalendarBlankBold, PiWalletBold } from "react-icons/pi";

const Sidebar = ({ user }) => {
  return (
    <aside className="veyra-sidebar">
      {/* Perfil no topo para melhor visibilidade */}
      <div className="sidebar-profile-header">
        <div className="avatar-container">
          <img src={user?.avatar} alt="User" className="mini-avatar" />
          <div className="status-dot"></div>
        </div>
        <div className="user-details">
          <span className="user-name">{user?.name || "Usuário"}</span>
          <small className="user-role">{user?.role || "Membro"}</small>
        </div>
      </div>

      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        <div className="nav-item active">
          <PiSquaresFourBold className="nav-icon" />
          <span>Dashboard</span>
        </div>
        <div className="nav-item">
          <PiWalletBold className="nav-icon" />
          <span>Financeiro</span>
        </div>
        <div className="nav-item">
          <PiCalendarBlankBold className="nav-icon" />
          <span>Calendário</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <h2 className="brand-logo">VEYRA</h2>
      </div>
    </aside>
  )
}

export default Sidebar