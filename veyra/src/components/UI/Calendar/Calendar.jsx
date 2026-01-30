import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import EventIndicator from '../EventIndicator/EventIndicator'; // O componente visual do ícone
import CalendarModal from '../../UI/CalendarModal/CalendarModal';
import { useCalendarEvents } from '../../../hooks/useCalendarEvents';
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  const { getEventsForDay, addUserEvent } = useCalendarEvents();

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
  // (Não armazenamos aqui em `holiday` porque usamos getEventsForDay que já compõe feriado + eventos)

  // chave usada no armazenamento/lookup: MM-DD
      const pad = (n) => String(n).padStart(2, '0');
      const dateKey = `${pad(viewMonth + 1)}-${pad(d)}`;

      // obtém feriados + eventos de usuário (pode ser array vazio)
      const dayEvents = getEventsForDay(dateKey) || [];

      days.push(
        <Motion.div 
          key={d} 
          className={`calendar-day ${isToday ? 'is-today' : ''} ${dayEvents.length > 0 ? 'has-event' : ''}`}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
          whileTap={{ scale: 0.96 }}
          layout
          onClick={() => {
            setSelectedDateKey(dateKey);
            setIsModalOpen(true);
          }}
        >
          <div className="day-header">
            <span className="day-number">{d}</span>
          </div>

          {/* 2. Se houver eventos (feriado ou usuário), mostra o indicador automático */}
          {dayEvents.length > 0 && (
            <div className="day-events-container">
              <EventIndicator event={dayEvents[0]} />
            </div>
          )}
          
        </Motion.div>
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
          <Motion.div
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
          </Motion.div>
        </AnimatePresence>
      </div>
        {/* Modal para ver/adicionar eventos num dia */}
        <CalendarModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dateKey={selectedDateKey}
          events={selectedDateKey ? (getEventsForDay(selectedDateKey) || []) : []}
          onAddEvent={(dateKey, newEvent) => addUserEvent(dateKey, newEvent)}
        />
    </div>
  );
};

export default Calendar;