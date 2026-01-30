import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import EventIndicator from '../EventIndicator/EventIndicator';
import CalendarModal from '../../UI/CalendarModal/CalendarModal';
import { useCalendarEvents } from '../../../hooks/useCalendarEvents';
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  // Hook com as funções de gestão de estado
  const { getEventsForDay, addUserEvent, deleteUserEvent } = useCalendarEvents();

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

    // Preenchimento de dias vazios do mês anterior
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Geração dos dias do mês atual
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = new Date().toDateString() === new Date(viewYear, viewMonth, d).toDateString();
      
      const pad = (n) => String(n).padStart(2, '0');
      // dateKey no formato "MM-DD" para bater com holidays.js
      const dateKey = `${pad(viewMonth + 1)}-${pad(d)}`;

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

          {/* INDICADOR COM CARROSSEL AUTOMÁTICO NO GRID */}
          {dayEvents.length > 0 && (
            <div className="day-events-container">
              <EventIndicator events={dayEvents} />
            </div>
          )}
          
        </Motion.div>
      );
    }
    return days;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: { x: 0, opacity: 1, scale: 1 },
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

      {/* MODAL COMPLETO COM FUNÇÃO DE ADICIONAR E APAGAR */}
      <CalendarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dateKey={selectedDateKey}
        // Garante que passamos os eventos atualizados do dia selecionado
        events={selectedDateKey ? getEventsForDay(selectedDateKey) : []}
        onAddEvent={(dateKey, newEvent) => addUserEvent(dateKey, newEvent)}
        // A função deleteUserEvent recebe a data selecionada e o index enviado pelo Modal
        onDeleteEvent={(index) => deleteUserEvent(selectedDateKey, index)}
      />
    </div>
  );
};

export default Calendar;