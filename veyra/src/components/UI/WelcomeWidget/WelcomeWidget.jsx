import React from "react";
import "./WelcomeWidget.css";

const WelcomeWidget = ({ user }) => {
  const nomeExibicao = user?.name || "Usuário";

  return (
    <div className="container-saudacao">
      <span className="tag-sistema">Veyra System</span>
      <h1 className="texto-boas-vindas">
        Bem vindo, <span className="nome-destaque">{nomeExibicao}</span>
      </h1>
      <p className="subtexto-status">Painel de Controle Principal</p>
    </div>
  );
};

export default WelcomeWidget;