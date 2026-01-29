import React, { useState, useEffect } from 'react';
import { FiTarget, FiCheckCircle, FiActivity, FiFlag, FiClock, FiTrash2, FiStar } from 'react-icons/fi';
import './ProjectCard.css';

const iconMap = {
  metas: <FiTarget />,
  tarefas: <FiCheckCircle />,
  treino: <FiActivity />,
  objetivo: <FiFlag />,
  lembrete: <FiClock />
};

const ProjectCard = ({ title, category, color, time, isPriority, onDelete, hideDelete, dayOfWeek }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const normalizedCategory = category ? category.toLowerCase().replace('s', '') : '';

  const checkIsToday = () => {
    const diasSemanas = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const hojeNome = diasSemanas[new Date().getDay()];
    return dayOfWeek === hojeNome || (time && time.includes(hojeNome));
  };
  const isToday = checkIsToday();

  useEffect(() => {
    const hasValidTime = time && /\d{1,2}:\d{2}/.test(time);
    if (isToday && hasValidTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const timeMatch = time.match(/\d{1,2}:\d{2}/);
        if (!timeMatch) return;
        const [hours, minutes] = timeMatch[0].split(':');
        const target = new Date();
        target.setHours(parseInt(hours), parseInt(minutes), 0);
        const diff = target - now;
        if (diff > 0) {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${h > 0 ? h + 'h ' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        } else {
          setTimeLeft("Em andamento");
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isToday, time]);

  return (
    <div 
      className={`project-card ${isPriority ? 'priority-border' : ''}`}
      style={{ '--card-color': color }}
    >
      {/* Lado Direito: Ícone Gigante Decorativo (Silhueta) */}
      <div className="card-watermark-icon">
        {iconMap[normalizedCategory]}
      </div>

      {/* Botão Deletar (Fica na parte colorida) */}
      {!hideDelete && (
        <button className="delete-btn-card" onClick={onDelete}>
          <FiTrash2 />
        </button>
      )}

      {/* Lado Esquerdo: Conteúdo Principal */}
      <div className="card-logo-badge">
        {iconMap[normalizedCategory] || <FiStar />}
      </div>

      <h3 className="card-title">{title}</h3>
      <span className="card-category">{category}</span>

      <div className="card-footer-info">
        <FiClock />
        <span>
           {isToday && timeLeft ? `Falta ${timeLeft}` : time}
        </span>
      </div>
      
      {isPriority && (
         <div style={{ position: 'absolute', bottom: 15, right: 15, color: 'white', zIndex: 20 }}>
            <FiStar fill="white" />
         </div>
      )}
    </div>
  );
};

export default ProjectCard;