import React from 'react';
import { FiTarget, FiCheckCircle, FiActivity, FiFlag, FiClock, FiTrash2, FiStar } from 'react-icons/fi';
import './ProjectCard.css';

const iconMap = {
  metas: <FiTarget />,
  tarefas: <FiCheckCircle />,
  treino: <FiActivity />,
  objetivo: <FiFlag />,
  lembrete: <FiClock />
};

const ProjectCard = ({ 
  title, 
  category, 
  color, 
  time, 
  isPriority, 
  onDelete 
}) => {
  return (
    <div 
      className={`project-card ${isPriority ? 'priority-border' : ''}`}
      style={{ 
        '--card-color': color,
        '--card-color-glow': `${color}33`
      }}
    >
      <div className="card-header">
        <div className="icon-badge">
          {iconMap[category.toLowerCase()] || <FiStar />}
        </div>
        <div className="card-actions">
          {isPriority && <FiStar className="priority-star" title="Prioridade" />}
          <button className="delete-btn" onClick={onDelete}>
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {time && (
          <div className="card-time">
            <FiClock size={14} />
            <span>{time}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="category-tag">{category}</span>
      </div>
    </div>
  );
};

export default ProjectCard;