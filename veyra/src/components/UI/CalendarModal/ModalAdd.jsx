import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Check } from "@phosphor-icons/react";

const EMOJIS = [
  '🎂', '🎉', '🎈', '🎁', '🕯️', '📌', '💻', '📝', '📚', '💼',
  '💰', '🏦', '💳', '🏋️‍♂️', '🏃‍♂️', '💊', '🍎', '🍕', '☕', '🍔',
  '🏠', '🚗', '✈️', '🚀', '🎬', '🎮', '🎧', '❤️', '🌟', '🔥'
];

const ModalAdd = ({ onSave, onBack, dateKey }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [emoji, setEmoji] = useState('📌');

  return (
    <Motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="modal-add-container"
    >
      <h2 className="modal-title">Novo Evento</h2>
      <p className="modal-subtitle">Dia {dateKey}</p>

      <div className="input-group">
        <label>O que vais fazer?</label>
        <input 
          className="styled-input"
          type="text" 
          placeholder="Ex: Aniversário do Nilton" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Descrição</label>
        <textarea 
          className="styled-input styled-textarea"
          placeholder="Opcional..." 
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Escolhe um ícone</label>
        <div className="emoji-grid-container">
          <div className="emoji-grid">
            {EMOJIS.map(e => (
              <button 
                key={e} 
                className={`emoji-btn ${emoji === e ? 'active' : ''}`} 
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-cancel" onClick={onBack}>Voltar</button>
        <button 
          className="btn-save" 
          disabled={!name}
          onClick={() => onSave({ name, description: desc, icon: emoji, color: "#8b5cf6" })}
        >
          <Check weight="bold" /> Guardar
        </button>
      </div>
    </Motion.div>
  );
};

export default ModalAdd;