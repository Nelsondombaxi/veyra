import React from 'react'
import './Sidebar.css'
import { 
  PiSquaresFourBold, 
  PiCalendarBlankBold, 
  PiWalletBold, 
  PiListChecksBold
} from "react-icons/pi";

const Sidebar = ({ user, activeTab, setActiveTab, onLock }) => {
  return (
    <aside className="veyra-sidebar">
      <div 
        className="sidebar-profile-header clickable-profile" 
        onClick={onLock}
        title="Bloquear tela / Tela inicial"
      >
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
        <div 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <PiSquaresFourBold className="nav-icon" />
          <span>Dashboard</span>
        </div>

        <div 
          className={`nav-item ${activeTab === 'projetos' ? 'active' : ''}`}
          onClick={() => setActiveTab('projetos')}
        >
          <PiListChecksBold className="nav-icon" />
          <span>Projetos</span>
        </div>

        <div 
          className={`nav-item ${activeTab === 'financeiro' ? 'active' : ''}`} 
          onClick={() => setActiveTab('financeiro')}
        >
          <PiWalletBold className="nav-icon" />
          <span>Financeiro</span>
        </div>
        
        <div 
          className={`nav-item ${activeTab === 'calendario' ? 'active' : ''}`} 
          onClick={() => setActiveTab('calendario')}
        >
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

export default Sidebar;