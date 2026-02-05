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

  const filteredProjects = projects.filter((project) => {
    const titleLower = project.title.toLowerCase().trim();
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch = searchLower === "" || titleLower.startsWith(searchLower);

    if (activeFilter === "Todos") return matchesSearch;

    const projectCat = project.category.toLowerCase().trim().replace(/s$/, '');
    const selectedFilter = activeFilter.toLowerCase().trim().replace(/s$/, '');

    const matchesFilter = projectCat === selectedFilter;

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
                placeholder="Pesquisa o projeto..."
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
              {searchTerm ? (
                <p>Nenhum projeto começa com "{searchTerm}".</p>
              ) : (
                <p>Nenhum projeto encontrado em "{activeFilter}".</p>
              )}
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