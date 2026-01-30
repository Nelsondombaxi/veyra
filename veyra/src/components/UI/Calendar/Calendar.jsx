import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import EventIndicator from '../EventIndicator/EventIndicator'; // O componente visual do ícone
import { getHoliday } from '../../../utils/calendarUtils'; // A lógica que busca os feriados
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const viewMonth = date.getMonth();
  const viewYear = date.getFullYear();

  const changeMonth = (offset) => {
    setDirection(offset);
    setDate(new Date(viewYear, viewMonth + offset, 1));
  };

  const generateDays = () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const days = [];

    // Blocos vazios (para alinhar o dia 1 na semana correta)
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Dias reais
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = new Date().toDateString() === new Date(viewYear, viewMonth, d).toDateString();
      
      // 1. Verifica se existe um feriado para este dia específico
      const holiday = getHoliday(d, viewMonth, viewYear);

      days.push(
        <motion.div 
          key={d} 
          className={`calendar-day ${isToday ? 'is-today' : ''} ${holiday ? 'has-event' : ''}`}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
          whileTap={{ scale: 0.96 }}
          layout
        >
          <div className="day-header">
            <span className="day-number">{d}</span>
          </div>

          {/* 2. Se houver feriado, mostra o indicador automático */}
          {holiday && (
            <div className="day-events-container">
              <EventIndicator event={holiday} />
            </div>
          )}
          
        </motion.div>
      );
    }
    return days;
  };

  // Configuração da animação de slide
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="calendar-container-mobile">
      <CalendarHeader 
        currentMonth={viewMonth} 
        currentYear={viewYear} 
        onPrevMonth={() => changeMonth(-1)} 
        onNextMonth={() => changeMonth(1)} 
      />

      <div className="week-days-row">
        {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(day => (
          <span key={day} className="week-day">{day}</span>
        ))}
      </div>

      <div className="calendar-grid-wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={date.getTime()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="calendar-grid"
          >
            {generateDays()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Calendar;