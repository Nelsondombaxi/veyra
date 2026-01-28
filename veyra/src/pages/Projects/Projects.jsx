import React, { useState } from 'react';
import ActionButton from '../../components/UI/ActionButton/ActionButton';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import StatusFilter from '../../components/UI/StatusFilter/StatusFilter';
import './Projects.css';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const handleNewProject = () => {
    console.log("Abrir modal de criação...");
  };

  return (
    <div className="projects-wrapper">
      <header className="projects-header">
        <div className="header-top">
          <SearchBar 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <ActionButton onClick={handleNewProject} />
        </div>
        
        <StatusFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
      </header>

      <main className="projects-grid-container">
        {/* Aqui entrarão os cards no Passo 3 */}
        <div className="empty-state">
          <p>Nenhum card criado. Comece adicionando um novo objetivo!</p>
        </div>
      </main>
    </div>
  );
};

export default Projects;