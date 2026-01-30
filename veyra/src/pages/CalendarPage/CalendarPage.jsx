import React from 'react';
import Calendar from '../../components/UI/Calendar/Calendar';
import './CalendarPage.css';

const CalendarPage = () => {
  return (
    <div className="calendar-page-wrapper">
      <div className="calendar-page-content">
        <header className="page-header">
          <span className="section-label">ORGANIZAÇÃO</span>
          <h1>Calendário</h1>
          <p>Sua memória do tempo e compromissos.</p>
        </header>

        <section className="main-calendar-area">
          {/* O componente inteligente que desenhamos entra aqui */}
          <Calendar />
        </section>

        <footer className="calendar-footer-info">
          <div className="info-item">
            <span className="dot purple"></span>
            <span>Hoje</span>
          </div>
          <div className="info-item">
            <span className="dot gray"></span>
            <span>Sem eventos</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CalendarPage;