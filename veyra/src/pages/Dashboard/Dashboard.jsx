import React from "react";
import "./Dashboard.css";
import DateWidget from "../../components/UI/DateWidget/DateWidget";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <header className="cabecalho-principal">
        
        {/* Lado do Nome/Sistema */}
        <div className="secao-usuario">
           {/* Futuro componente de Boas-vindas */}
        </div>

        {/* Lado das Ferramentas/Widgets */}
        <div className="secao-widgets">
          <DateWidget />
        </div>

      </header>

      <main className="area-conteudo-central">
        {/* Tudo o que você adicionar vai aqui dentro */}
      </main>
    </div>
  );
};

export default Dashboard;