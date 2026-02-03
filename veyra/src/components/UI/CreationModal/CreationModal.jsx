import React, { useState } from 'react';
import { FiX, FiTarget, FiCheckCircle, FiActivity, FiFlag, FiClock, FiCalendar } from 'react-icons/fi';
import './CreationModal.css';

const icons = [
  { id: 'meta', icon: <FiTarget />, label: 'Meta' },
  { id: 'tarefa', icon: <FiCheckCircle />, label: 'Tarefa' },
  { id: 'treino', icon: <FiActivity />, label: 'Treino' },
  { id: 'objetivo', icon: <FiFlag />, label: 'Objetivo' },
  { id: 'lembrete', icon: <FiClock />, label: 'Lembrete' },
];

const colors = ['#6B46C1', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

const CreationModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('meta'); 
  const [selectedColor, setSelectedColor] = useState('#6B46C1');
  const [isPriority, setIsPriority] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTime = date ? `${date.split('-').reverse().join('/')} ${time}` : time;
    
    onSave({ 
      id: Date.now(), 
      title, 
      category: selectedIcon, 
      color: selectedColor, 
      isPriority, 
      time: formattedTime || null 
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <div className="header-text">
            <h2>Novo Card</h2>
            <p>Personalize sua meta ou tarefa</p>
          </div>
          <button className="close-modal-btn" onClick={onClose} type="button">
            <FiX />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-section">
            <label className="section-label">Título</label>
            <input 
              className="modal-input" 
              placeholder="Ex: Treino de pernas..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="selection-group">
            <label className="section-label">Tipo de Atividade</label>
            <div className="icon-list-horizontal">
              {icons.map((item) => (
                <button 
                  key={item.id}
                  type="button"
                  className={`icon-list-item ${selectedIcon === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedIcon(item.id)}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  <span className="label-text">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="selection-group">
            <label className="section-label">Cor Visual</label>
            <div className="color-grid">
              {colors.map((color) => (
                <button 
                  key={color}
                  type="button"
                  className={`color-item ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="datetime-row">
            <div className="input-section">
              <label className="section-label">Data</label>
              <div className="input-with-icon">
                <FiCalendar className="inner-icon" />
                <input 
                  type="date" 
                  className="modal-input" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="input-section">
              <label className="section-label">Hora</label>
              <div className="input-with-icon">
                <FiClock className="inner-icon" />
                <input 
                  type="time" 
                  className="modal-input" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <label className="priority-toggle">
            <input 
              type="checkbox" 
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
            />
            <div className="toggle-text">
              <span>Marcar como Prioridade</span>
              <small>Este card aparecerá na Dashboard principal</small>
            </div>
          </label>

          <button type="submit" className="save-btn">Criar Novo Card</button>
        </form>
      </div>
    </div>
  );
};

export default CreationModal;