import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FiLayout, FiDollarSign, FiCalendar } from 'react-icons/fi';
import DateWidget from "../../components/UI/DateWidget/DateWidget";
import WelcomeWidget from "../../components/UI/WelcomeWidget/WelcomeWidget";
import Showcase from "../../components/UI/Showcase/Showcase";
import AutoCarousel from "../../components/UI/AutoCarousel/AutoCarousel";
import CreditCard from "../../components/UI/CreditCard/CreditCard"; 
import UpcomingEvents from "../../components/UI/UpcomingEvents/UpcomingEvents";

const Dashboard = ({ user }) => {

  const fullName = `${user?.name || ''} ${user?.surname || ''}`.trim().toUpperCase() || "TITULAR VEYRA";

  const [financialData, setFinancialData] = useState(() => {
    const saved = localStorage.getItem("@veyra:finance");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        balance: parsed.balance || 0,
        theme: parsed.theme || 'black',
        holderName: fullName
      };
    }
    return { balance: 0, theme: 'black', holderName: fullName };
  });

  const [priorityProjects, _setPriorityProjects] = useState(() => {
    const saved = localStorage.getItem('@veyra:projects');
    if (saved) {
      const allProjects = JSON.parse(saved);
      return allProjects.filter(p => p.isPriority === true);
    }
    return [];
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "@veyra:finance") {
        const saved = localStorage.getItem("@veyra:finance");
        if (saved) {
          const parsed = JSON.parse(saved);
          setFinancialData({
            balance: parsed.balance || 0,
            theme: parsed.theme || 'black',
            holderName: fullName
          });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fullName]);

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
        <Showcase title="Projetos em Destaque" icon={FiLayout}>
          <AutoCarousel items={priorityProjects} />
        </Showcase>
        <Showcase title="Financeiro" icon={FiDollarSign}>
          <div className="dash-finance-center">
            <CreditCard 
              balance={financialData.balance} 
              theme={financialData.theme}
              cardInfo={{
                bankName: "VEYRA BANK",
                holderName: financialData.holderName
              }} 
            />
          </div>
        </Showcase>
        <Showcase title="Calendário" icon={FiCalendar}>
          <div className="dash-calendar-content">
            <UpcomingEvents />
          </div>
        </Showcase>
      </main>
    </div>
  );
};

export default Dashboard;