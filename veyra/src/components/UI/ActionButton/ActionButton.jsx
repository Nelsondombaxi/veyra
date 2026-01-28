import React from 'react';
import { FiPlus } from 'react-icons/fi';
import './ActionButton.css';

const ActionButton = ({ onClick, children = "Adicionar" }) => {
  return (
    <button className="veyra-action-button" onClick={onClick}>
      <FiPlus className="action-icon" />
      <span>{children}</span>
    </button>
  );
};

export default ActionButton;