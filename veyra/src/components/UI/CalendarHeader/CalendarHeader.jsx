import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';

const CalendarHeader = ({ currentMonth, currentYear, onPrevMonth, onNextMonth }) => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="calendar-header-mobile" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
      <div className="header-info-group">
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', margin: 0 }}>
          {months[currentMonth]}
          <span style={{ color: '#8b5cf6', marginLeft: '10px', fontWeight: '300' }}>{currentYear}</span>
        </h2>
      </div>

      <div className="header-nav-actions" style={{ display: 'flex', gap: '8px' }}>
        <NavButton onClick={onPrevMonth} icon={<FiChevronLeft />} />
        <NavButton onClick={onNextMonth} icon={<FiChevronRight />} />
      </div>
    </div>
  );
};

const NavButton = ({ onClick, icon }) => (
  <Motion.button 
    onClick={onClick}
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
    whileTap={{ scale: 0.9 }}
    style={{
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'white',
      padding: '10px',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem'
    }}
  >
    {icon}
  </Motion.button>
);

export default CalendarHeader;