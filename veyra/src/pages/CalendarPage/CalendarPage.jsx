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
          <Calendar />
        </section>
      </div>
    </div>
  );
};

export default CalendarPage;