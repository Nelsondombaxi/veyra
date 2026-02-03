import React from 'react';
import './StatusFilter.css';

const StatusFilter = ({ activeFilter, onFilterChange }) => {
  // Mantemos os nomes que aparecem na interface
  const filters = ['Todos', 'Metas', 'Tarefas', 'Treinos', 'Objetivos', 'Lembretes'];

  return (
    <div className="veyra-filter-group">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;