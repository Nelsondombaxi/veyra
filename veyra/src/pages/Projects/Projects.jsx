import React, { useState, useEffect } from 'react';
import ActionButton from '../../components/UI/ActionButton/ActionButton';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import StatusFilter from '../../components/UI/StatusFilter/StatusFilter';
import ProjectCard from '../../components/UI/ProjectCard/ProjectCard';
import CreationModal from '../../components/UI/CreationModal/CreationModal';
import './Projects.css';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('@veyra:projects');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('@veyra:projects', JSON.stringify(projects));
  }, [projects]);

  const handleSaveProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'Todos' || project.category.toLowerCase() === activeFilter.toLowerCase().replace('s', ''); 
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="projects-wrapper">
      <header className="projects-header">
        <div className="header-top">
          <SearchBar 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <ActionButton onClick={() => setIsModalOpen(true)} />
        </div>
        
        <StatusFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
      </header>

      <main className="projects-grid-container">
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id}
                {...project}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Nenhum card encontrado. Comece adicionando um novo objetivo!</p>
          </div>
        )}
      </main>

      <CreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default Projects;