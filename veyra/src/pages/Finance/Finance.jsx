import React, { useState, useEffect, useCallback } from "react";
import CreditCard from "../../components/UI/CreditCard/CreditCard";
import Wishlist from "../../components/UI/Wishlist/Wishlist";
import { FiPlus, FiEdit3, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import "./Finance.css";

const Finance = ({ user }) => {
  const fullName = `${user?.name || ''} ${user?.surname || ''}`.trim().toUpperCase();

  const [financeData, setFinanceData] = useState(() => {
    const saved = localStorage.getItem("@veyra:finance");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        balance: parsed.balance || 0,
        theme: parsed.theme || 'black',
        currency: parsed.currency || 'AOA',
        cardInfo: { bankName: "VEYRA BANK", holderName: fullName || "TITULAR VEYRA" }
      };
    }
    return { 
      balance: 0, 
      theme: 'black', 
      currency: 'AOA',
      cardInfo: { bankName: "VEYRA BANK", holderName: fullName || "TITULAR VEYRA" } 
    };
  });

  const [activeModal, setActiveModal] = useState(null); 
  const [modalPage, setModalPage] = useState(1); // 1 para Temas, 2 para Moedas
  const [inputValue, setInputValue] = useState("");

  const refreshData = useCallback(() => {
    const saved = localStorage.getItem("@veyra:finance");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFinanceData(prev => ({
        ...prev,
        balance: parsed.balance || 0,
        theme: parsed.theme || 'black',
        currency: parsed.currency || 'AOA'
      }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", refreshData);
    
    const dataToSave = { 
      ...financeData, 
      cardInfo: { ...financeData.cardInfo, holderName: fullName || "TITULAR VEYRA" } 
    };
    localStorage.setItem("@veyra:finance", JSON.stringify(dataToSave));
    
    return () => window.removeEventListener("storage", refreshData);
  }, [financeData, fullName, refreshData]);

  const handleUpdateBalance = (type) => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      const newBalance = type === 'add' ? financeData.balance + amount : financeData.balance - amount;
      const updatedData = { ...financeData, balance: newBalance };
      setFinanceData(updatedData);
      localStorage.setItem("@veyra:finance", JSON.stringify(updatedData));
      window.dispatchEvent(new Event("storage"));
    }
    setInputValue("");
    setActiveModal(null);
  };

  const changeTheme = (newTheme) => {
    const updatedData = { ...financeData, theme: newTheme };
    setFinanceData(updatedData);
    localStorage.setItem("@veyra:finance", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("storage"));
    setActiveModal(null); // Fecha a modal após selecionar
  };

  const changeCurrency = (newCurr) => {
    const updatedData = { ...financeData, currency: newCurr };
    setFinanceData(updatedData);
    localStorage.setItem("@veyra:finance", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("storage"));
    setActiveModal(null); // Fecha a modal após selecionar
  };

  return (
    <div className="finance-page-container">
      <div className="finance-content-wrapper">
        <header className="finance-header">
          <h1>Gestão Financeira</h1>
          <p>Olá, {user?.name}. Controle seu saldo em {financeData.currency}.</p>
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
              currency={financeData.currency}
            />
          </div>

          <button className="side-action-btn right" onClick={() => { setActiveModal('theme'); setModalPage(1); }}>
            <FiEdit3 /> <span>Estilo</span>
          </button>
        </section>

        <div className="wishlist-placeholder">
          <div className="section-divider"></div>
          <Wishlist globalCurrency={financeData.currency} />
        </div>
      </div>

      {activeModal === 'balance' && (
        <div className="finance-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="finance-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-x" onClick={() => setActiveModal(null)}>
              <FiX size={20} />
            </button>
            <h3>Gerenciar Saldo</h3>
            <input 
              type="number" 
              placeholder={`Digite o valor em ${financeData.currency}`} 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn-confirm add" onClick={() => handleUpdateBalance('add')}>Confirmar Depósito</button>
              <button className="btn-confirm sub" onClick={() => handleUpdateBalance('sub')}>Confirmar Retirada</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'theme' && (
        <div className="finance-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="finance-modal carrossel-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-x" onClick={() => setActiveModal(null)}>
              <FiX size={20} />
            </button>
            
            <div className="modal-navigation">
              <button className="nav-arrow" onClick={() => setModalPage(modalPage === 1 ? 2 : 1)}>
                <FiChevronLeft />
              </button>

              <div className="modal-page-content">
                {modalPage === 1 ? (
                  <>
                    <h3>Estilo do Cartão</h3>
                    <p className="modal-desc">Escolha a aparência do seu Veyra</p>
                    <div className="theme-grid">
                      <button className="theme-opt black" onClick={() => changeTheme('black')}>Veyra Dark</button>
                      <button className="theme-opt purple" onClick={() => changeTheme('purple')}>Veyra Purple</button>
                      <button className="theme-opt blue" onClick={() => changeTheme('blue')}>Veyra Blue</button>
                      <button className="theme-opt rose" onClick={() => changeTheme('rose')}>Veyra Rose</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Moeda do Sistema</h3>
                    <p className="modal-desc">Defina a moeda principal</p>
                    <div className="currency-grid">
                      <button className={`curr-opt ${financeData.currency === 'AOA' ? 'active' : ''}`} onClick={() => changeCurrency('AOA')}>Kwanza (Kz)</button>
                      <button className={`curr-opt ${financeData.currency === 'EUR' ? 'active' : ''}`} onClick={() => changeCurrency('EUR')}>Euro (€)</button>
                      <button className={`curr-opt ${financeData.currency === 'USD' ? 'active' : ''}`} onClick={() => changeCurrency('USD')}>Dólar ($)</button>
                    </div>
                  </>
                )}
              </div>

              <button className="nav-arrow" onClick={() => setModalPage(modalPage === 1 ? 2 : 1)}>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;