import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FiLayout, FiDollarSign, FiCalendar } from 'react-icons/fi';
import DateWidget from "../../components/UI/DateWidget/DateWidget";
import WelcomeWidget from "../../components/UI/WelcomeWidget/WelcomeWidget";
import Showcase from "../../components/UI/Showcase/Showcase";
import AutoCarousel from "../../components/UI/AutoCarousel/AutoCarousel";

const Dashboard = ({ user }) => {
  const [priorityProjects, setPriorityProjects] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('@veyra:projects');
    if (saved) {
      const allProjects = JSON.parse(saved);
      const filtered = allProjects.filter(p => p.isPriority === true);
      setPriorityProjects(filtered);
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="cabecalho-principal">
        <div className="secao-usuario">
           <WelcomeWidget user={user} />
        </div>
        <div className="secao-widgets">
          <DateWidget />
        </div>
      </header>

      <main className="area-conteudo-central">
        {/* VITRINE DE PROJETOS - Onde os cards giram sozinhos */}
        <Showcase title="Projetos em Destaque" icon={FiLayout}>
          <AutoCarousel items={priorityProjects} />
        </Showcase>

        {/* VITRINE FINANCEIRO - Espaço para o futuro */}
        <Showcase title="Financeiro" icon={FiDollarSign}>
          <div className="empty-placeholder-dash">
            <p>Nenhum dado financeiro disponível.</p>
          </div>
        </Showcase>

        {/* VITRINE CALENDÁRIO - Espaço para o futuro */}
        <Showcase title="Calendário" icon={FiCalendar}>
          <div className="empty-placeholder-dash">
            <p>Nenhum evento próximo agendado.</p>
          </div>
        </Showcase>
      </main>
    </div>
  );
};

export default Dashboard;