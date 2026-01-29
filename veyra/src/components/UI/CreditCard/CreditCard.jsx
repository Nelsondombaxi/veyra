import React from 'react';
import './CreditCard.css';

const CreditCard = ({ balance, cardInfo }) => {
  // Formata o valor para o padrão de moeda (Kz)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
    }).format(value).replace('AOA', 'Kz');
  };

  return (
    <div className="mastercard-black-card">
      <div className="card-inner">
        {/* Topo do Cartão: Banco e Chip */}
        <div className="card-header">
          <span className="bank-name">{cardInfo.bankName || "VEYRA BANK"}</span>
          <div className="card-chip">
            <div className="chip-line"></div>
            <div className="chip-line"></div>
            <div className="chip-line"></div>
            <div className="chip-line"></div>
          </div>
        </div>

        {/* Centro: Saldo Atual */}
        <div className="card-balance-section">
          <p className="balance-label">SALDO DISPONÍVEL</p>
          <h2 className="balance-value">{formatCurrency(balance)}</h2>
        </div>

        {/* Rodapé: Nome do Titular e Logo Mastercard */}
        <div className="card-footer">
          <div className="holder-info">
            <span className="holder-label">TITULAR</span>
            <span className="holder-name">{cardInfo.holderName || "NOME DO USUÁRIO"}</span>
          </div>
          
          <div className="mastercard-logo">
            <div className="circle red"></div>
            <div className="circle orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;