import React, { useState, useEffect } from "react";
import CreditCard from "../../components/UI/CreditCard/CreditCard";
import Wishlist from "../../components/UI/Wishlist/Wishlist";
import { FiPlus, FiEdit3 } from 'react-icons/fi';
import "./Finance.css";

const Finance = () => {
  // Inicialização segura com LocalStorage
  const initialFinanceData = (() => {
    try {
      const raw = localStorage.getItem("@veyra:finance");
      if (!raw) return { balance: 0, cardInfo: { bankName: "VEYRA BANK", holderName: "NOME DO USUÁRIO" } };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
      return {
        balance: typeof parsed.balance === 'number' ? parsed.balance : 0,
        cardInfo: {
          bankName: parsed.cardInfo?.bankName || 'VEYRA BANK',
          holderName: parsed.cardInfo?.holderName || 'NOME DO USUÁRIO',
        },
      };
    } catch (err) {
      try { localStorage.removeItem("@veyra:finance"); } catch (e) {}
      return { balance: 0, cardInfo: { bankName: 'VEYRA BANK', holderName: 'NOME DO USUÁRIO' } };
    }
  })();

  const [financeData, setFinanceData] = useState(initialFinanceData);
  const [activeModal, setActiveModal] = useState(null); 
  const [inputValue, setInputValue] = useState("");
  const [tempNames, setTempNames] = useState({ 
    bank: financeData.cardInfo.bankName, 
    holder: financeData.cardInfo.holderName 
  });

  useEffect(() => {
    localStorage.setItem("@veyra:finance", JSON.stringify(financeData));
  }, [financeData]);

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

  const handleSaveCard = () => {
    setFinanceData(prev => ({
      ...prev,
      cardInfo: { bankName: tempNames.bank, holderName: tempNames.holder }
    }));
    setActiveModal(null);
  };

  return (
    <div className="finance-page-container">
      <div className="finance-content-wrapper">
        <header className="finance-header">
          <h1>Gestão Financeira</h1>
          <p>Controle seu saldo e gerencie seu cartão de elite.</p>
        </header>

        {/* SEÇÃO DO TOPO - CARTÃO CENTRALIZADO SEM DISTORÇÃO */}
        <section className="card-management-area">
          <button className="side-action-btn left" onClick={() => setActiveModal('balance')}>
            <FiPlus />
            <span>Saldo</span>
          </button>

          <div className="central-card">
            <CreditCard balance={financeData.balance} cardInfo={financeData.cardInfo} />
          </div>

          <button className="side-action-btn right" onClick={() => setActiveModal('card')}>
            <FiEdit3 />
            <span>Editar</span>
          </button>
        </section>

        {/* ÁREA DA LISTA DE COMPRAS (COMPONENTIZAÇÃO FUTURA) */}
        <div className="wishlist-placeholder">
          <div className="section-divider"></div>
          { <Wishlist /> }
        </div>
      </div>

      {/* MODAL PARA ADICIONAR/SUBTRAIR VALORES */}
      {activeModal === 'balance' && (
        <div className="finance-modal-overlay">
          <div className="finance-modal">
            <h3>Gerenciar Saldo</h3>
            <input 
              type="number" 
              placeholder="Digite o valor em Kz" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn-confirm add" onClick={() => handleUpdateBalance('add')}>Adicionar Kz</button>
              <button className="btn-confirm sub" onClick={() => handleUpdateBalance('sub')}>Abater Kz</button>
              <button className="btn-cancel" onClick={() => setActiveModal(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA EDITAR DADOS DO CARTÃO */}
      {activeModal === 'card' && (
        <div className="finance-modal-overlay">
          <div className="finance-modal">
            <h3>Configurações do Cartão</h3>
            <input 
              type="text" 
              placeholder="Nome do Banco" 
              value={tempNames.bank}
              onChange={(e) => setTempNames({...tempNames, bank: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Nome do Titular" 
              value={tempNames.holder}
              onChange={(e) => setTempNames({...tempNames, holder: e.target.value})}
            />
            <div className="modal-actions">
              <button className="btn-confirm" onClick={handleSaveCard}>Salvar Alterações</button>
              <button className="btn-cancel" onClick={() => setActiveModal(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;