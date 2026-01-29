import React from 'react';
import './CreditCard.css';

const CreditCard = ({ balance, cardInfo, theme = 'black' }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
    }).format(value).replace('AOA', 'Kz');
  };

  return (
    <div className={`mastercard-black-card card-theme-${theme}`}>
      <div className="card-inner">
        <div className="card-header">
          <span className="bank-name">VEYRA BANK</span>
          <div className="card-chip">
            <div className="chip-line"></div>
            <div className="chip-line"></div>
            <div className="chip-line"></div>
            <div className="chip-line"></div>
          </div>
        </div>

        <div className="card-balance-section">
          <p className="balance-label">SALDO DISPONÍVEL</p>
          <h2 className="balance-value">{formatCurrency(balance)}</h2>
        </div>

        <div className="card-footer">
          <div className="holder-info">
            <span className="holder-label">TITULAR</span>
            <span className="holder-name">{cardInfo.holderName}</span>
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