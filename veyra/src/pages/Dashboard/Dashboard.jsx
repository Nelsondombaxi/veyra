import React from 'react'
import './Dashboard.css'

// Protege caso `user` venha como undefined/null
const Dashboard = ({ user = { name: 'Usuário' } }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="welcome-box">
          <span>Overview</span>
          <h1>Dashboard de {user.name}</h1>
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Projetos Ativos</h3>
          <p className="stat-number">12</p>
        </div>
        <div className="stat-card">
          <h3>Horas Focadas</h3>
          <p className="stat-number">48h</p>
        </div>
        <div className="stat-card purple-card">
          <h3>Produtividade</h3>
          <p className="stat-number">+15%</p>
        </div>
      </section>
    </div>
  )
}

export default Dashboard