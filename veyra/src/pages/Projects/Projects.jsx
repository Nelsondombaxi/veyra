import React, { useState, useEffect } from "react";
import ActionButton from "../../components/UI/ActionButton/ActionButton";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import StatusFilter from "../../components/UI/StatusFilter/StatusFilter";
import ProjectCard from "../../components/UI/ProjectCard/ProjectCard";
import CreationModal from "../../components/UI/CreationModal/CreationModal";
import "./Projects.css";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("@veyra:projects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("@veyra:projects", JSON.stringify(projects));
  }, [projects]);

  const handleSaveProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const filterMap = {
    Todos: "todos",
    Metas: "metas",
    Tarefas: "tarefas",
    Treinos: "treino",
    Objetivos: "objetivo",
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const targetCategory = filterMap[activeFilter];
    const matchesFilter = activeFilter === "Todos" || project.category.toLowerCase() === targetCategory;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="projects-page-container">
      <div className="projects-content-wrapper">
        <header className="projects-header">
          <div className="header-top-row">
            <div className="search-bar-wrapper">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ActionButton onClick={() => setIsModalOpen(true)} />
          </div>

          <StatusFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </header>

        <main className="projects-grid-section">
          {filteredProjects.length > 0 ? (
            <div className="projects-grid-layout">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card-container">
                   <ProjectCard
                    {...project}
                    onDelete={() => handleDeleteProject(project.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-box">
              <p>Nenhum projeto encontrado.</p>
            </div>
          )}
        </main>
      </div>

      <CreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default Projects;