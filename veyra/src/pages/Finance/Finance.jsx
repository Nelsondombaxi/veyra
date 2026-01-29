import React, { useState, useEffect } from "react";
import CreditCard from "../../components/UI/CreditCard/CreditCard";
import Wishlist from "../../components/UI/Wishlist/Wishlist";
import { FiPlus, FiEdit3 } from 'react-icons/fi';
import "./Finance.css";

const Finance = ({ user }) => {
  // Pega o nome do usuário logado (App.js -> veyra_user)
  const fullName = `${user?.name || 'Nelson'} ${user?.lastName || 'Dombaxi'}`.toUpperCase();

  const [financeData, setFinanceData] = useState(() => {
    const saved = localStorage.getItem("@veyra:finance");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        balance: parsed.balance || 0,
        theme: parsed.theme || 'black', // Nova propriedade de tema
        cardInfo: { bankName: "VEYRA BANK", holderName: fullName }
      };
    }
    return { balance: 0, theme: 'black', cardInfo: { bankName: "VEYRA BANK", holderName: fullName } };
  });

  const [activeModal, setActiveModal] = useState(null); 
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Sincroniza sempre o nome atual do usuário e os dados no Storage
    const dataToSave = { ...financeData, cardInfo: { ...financeData.cardInfo, holderName: fullName } };
    localStorage.setItem("@veyra:finance", JSON.stringify(dataToSave));
  }, [financeData, fullName]);

  const handleUpdateBalance = (type) => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      setFinanceData(prev => ({
        ...prev,
        balance: type === 'add' ? prev.balance + amount : prev.balance - amount
      }));
    }
    setInputValue("");
    setActiveModal(null);
  };

  const changeTheme = (newTheme) => {
    setFinanceData(prev => ({ ...prev, theme: newTheme }));
    setActiveModal(null);
  };

  return (
    <div className="finance-page-container">
      <div className="finance-content-wrapper">
        <header className="finance-header">
          <h1>Gestão Financeira</h1>
          <p>Olá, {user?.name}. Controle seu saldo e personalize seu cartão.</p>
        </header>

        <section className="card-management-area">
          <button className="side-action-btn left" onClick={() => setActiveModal('balance')}>
            <FiPlus /> <span>Saldo</span>
          </button>

          <div className="central-card">
            <CreditCard 
              balance={financeData.balance} 
              cardInfo={financeData.cardInfo} 
              theme={financeData.theme} 
            />
          </div>

          <button className="side-action-btn right" onClick={() => setActiveModal('theme')}>
            <FiEdit3 /> <span>Estilo</span>
          </button>
        </section>

        <div className="wishlist-placeholder">
          <div className="section-divider"></div>
          <Wishlist />
        </div>
      </div>

      {activeModal === 'balance' && (
        <div className="finance-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="finance-modal" onClick={e => e.stopPropagation()}>
            <h3>Gerenciar Saldo</h3>
            <input 
              type="number" 
              placeholder="Digite o valor em Kz" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn-confirm add" onClick={() => handleUpdateBalance('add')}>Adicionar</button>
              <button className="btn-confirm sub" onClick={() => handleUpdateBalance('sub')}>Abater</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'theme' && (
        <div className="finance-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="finance-modal" onClick={e => e.stopPropagation()}>
            <h3>Estilo do Cartão</h3>
            <p style={{color: '#71717a', marginBottom: '20px', fontSize: '0.9rem'}}>Escolha a cor da sua conta Premium</p>
            <div className="theme-grid">
              <button className="theme-opt black" onClick={() => changeTheme('black')}>Original Black</button>
              <button className="theme-opt purple" onClick={() => changeTheme('purple')}>Veyra Purple</button>
              <button className="theme-opt blue" onClick={() => changeTheme('blue')}>Executive Blue</button>
            </div>
            <button className="btn-cancel" onClick={() => setActiveModal(null)} style={{marginTop: '20px'}}>Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;