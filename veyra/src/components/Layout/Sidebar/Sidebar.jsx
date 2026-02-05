import React from 'react';
import './Sidebar.css';
import { 
  PiSquaresFourBold, 
  PiCalendarBlankBold, 
  PiWalletBold, 
  PiListChecksBold,
  PiXBold 
} from "react-icons/pi";

const Sidebar = ({ user, activeTab, setActiveTab, onLock, isOpen, onClose }) => {
  
  // Troca de aba e fecha o menu
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (onClose) onClose(); 
  };

  // BLOQUEIA A TELA E FECHA O MENU AUTOMATICAMENTE
  const handleProfileClick = () => {
    onLock(); // Chama a função de bloqueio (mostra StartScreen)
    if (onClose) onClose(); // Fecha a sidebar no mobile para revelar a StartScreen
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />

      <aside id="veyra-sidebar" className={`veyra-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={onClose}>
          <PiXBold />
        </button>

        {/* Perfil: Agora chama a função combinada */}
        <div 
          className="sidebar-profile-header" 
          onClick={handleProfileClick}
          title="Bloquear tela"
        >
          <div className="avatar-container">
            <img 
              src={user?.avatar || "https://i.pravatar.cc/150?img=11"} 
              alt="User" 
              className="mini-avatar" 
            />
            <div className="status-dot"></div>
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name || "Nelson"}</span>
            <small className="user-role">{user?.role || "PROGRAMADOR"}</small>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('dashboard')}
          >
            <PiSquaresFourBold className="nav-icon" />
            <span>Dashboard</span>
          </div>

          <div 
            className={`nav-item ${activeTab === 'projetos' ? 'active' : ''}`}
            onClick={() => handleNavigation('projetos')}
          >
            <PiListChecksBold className="nav-icon" />
            <span>Projetos</span>
          </div>

          <div 
            className={`nav-item ${activeTab === 'financeiro' ? 'active' : ''}`} 
            onClick={() => handleNavigation('financeiro')}
          >
            <PiWalletBold className="nav-icon" />
            <span>Financeiro</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'calendario' ? 'active' : ''}`} 
            onClick={() => handleNavigation('calendario')}
          >
            <PiCalendarBlankBold className="nav-icon" />
            <span>Calendário</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <h2 className="brand-logo">VEYRA</h2>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;