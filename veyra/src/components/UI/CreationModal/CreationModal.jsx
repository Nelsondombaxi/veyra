import React, { useState } from 'react';
import { FiX, FiTarget, FiCheckCircle, FiActivity, FiFlag, FiClock } from 'react-icons/fi';
import './CreationModal.css';

const icons = [
  { id: 'metas', icon: <FiTarget />, label: 'Meta' },
  { id: 'tarefas', icon: <FiCheckCircle />, label: 'Tarefa' },
  { id: 'treino', icon: <FiActivity />, label: 'Treino' },
  { id: 'objetivo', icon: <FiFlag />, label: 'Objetivo' },
  { id: 'lembrete', icon: <FiClock />, label: 'Lembrete' },
];

const colors = ['#6B46C1', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

const CreationModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('metas');
  const [selectedColor, setSelectedColor] = useState('#6B46C1');
  const [isPriority, setIsPriority] = useState(false);
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      id: Date.now(), 
      title, 
      category: selectedIcon, 
      color: selectedColor, 
      isPriority, 
      time: time || null 
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Novo Card</h2>
          <button className="close-btn" onClick={onClose}><FiX /></button>
        </header>

        <form onSubmit={handleSubmit}>
          <input 
            className="modal-input" 
            placeholder="O que vamos fazer hoje?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="selection-group">
            <label>Escolha o Ícone</label>
            <div className="icon-grid">
              {icons.map((item) => (
                <button 
                  key={item.id}
                  type="button"
                  className={`icon-item ${selectedIcon === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedIcon(item.id)}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="selection-group">
            <label>Cor do Card</label>
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

          <div className="selection-group">
            <label>Tempo (Opcional)</label>
            <input 
              type="time" 
              className="modal-input" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <label className="priority-toggle">
            <input 
              type="checkbox" 
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
            />
            <span>Marcar como Prioridade (Exibir na Dashboard)</span>
          </label>

          <button type="submit" className="save-btn">Criar Card</button>
        </form>
      </div>
    </div>
  );
};

export default CreationModal;