import { useState, useEffect } from 'react';
import { holidays } from '../data/holidays';

export const useCalendarEvents = () => {
  const [userEvents, setUserEvents] = useState(() => {
    const saved = localStorage.getItem('veyra_calendar_events');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('veyra_calendar_events', JSON.stringify(userEvents));
  }, [userEvents]);

  const getEventsForDay = (dateKey) => {
    // Busca feriado fixo
    const dayHoliday = holidays[dateKey];
    const dayHolidays = dayHoliday ? [{ ...dayHoliday, isHoliday: true }] : [];
    
    // Busca eventos do usuário
    const dayUserEvents = userEvents[dateKey] || [];
    
    return [...dayHolidays, ...dayUserEvents];
  };

  const addUserEvent = (dateKey, newEvent) => {
    setUserEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { ...newEvent, isHoliday: false }]
    }));
  };

  // Nova função para apagar
  const deleteUserEvent = (dateKey, eventIndex) => {
    setUserEvents(prev => {
      const dayEvents = [...(prev[dateKey] || [])];
      // O index aqui precisa considerar que feriados vêm primeiro na lista total
      // Por isso, no ModalView passaremos o index correto para esta função
      dayEvents.splice(eventIndex, 1);
      
      if (dayEvents.length === 0) {
        const { [dateKey]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [dateKey]: dayEvents };
    });
  };

  return { getEventsForDay, addUserEvent, deleteUserEvent };
};