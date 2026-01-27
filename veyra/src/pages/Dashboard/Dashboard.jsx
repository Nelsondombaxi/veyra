import React from "react";
import "./Dashboard.css";
import DateWidget from "../../components/UI/DateWidget/DateWidget";
import WelcomeWidget from "../../components/UI/WelcomeWidget/WelcomeWidget";

const Dashboard = ({ user }) => { // Recebe o user aqui
  return (
    <div className="dashboard-wrapper">
      <header className="cabecalho-principal">
        
        <div className="secao-usuario">
           {/* Passamos o user para o widget */}
           <WelcomeWidget user={user} />
        </div>

        <div className="secao-widgets">
          <DateWidget />
        </div>

      </header>

      <main className="area-conteudo-central">
        {/* Espaço Livre */}
      </main>
    </div>
  );
};

export default Dashboard;