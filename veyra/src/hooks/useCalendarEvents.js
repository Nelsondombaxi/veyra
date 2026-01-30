import { useState, useEffect, useCallback } from 'react';
import { holidays } from '../data/holidays';

export const useCalendarEvents = () => {
  const [userEvents, setUserEvents] = useState(() => {
    const saved = localStorage.getItem('veyra_calendar_events');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('veyra_calendar_events', JSON.stringify(userEvents));
  }, [userEvents]);

  // Usamos useCallback para evitar re-renderizações infinitas no useEffect do componente
  const getUpcomingEvents = useCallback((limit = 10) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = 2026; 

    let allUpcoming = [];

    // Processar Feriados
    Object.entries(holidays).forEach(([dateKey, data]) => {
      // split('-') lida com "02-14" ou "2-14"
      const parts = dateKey.split('-');
      const m = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      
      const eventDate = new Date(currentYear, m - 1, d);
      if (eventDate >= today) {
        allUpcoming.push({ 
          ...data, 
          date: eventDate, 
          isHoliday: true,
          id: `holiday-${dateKey}` 
        });
      }
    });

    // Processar Eventos do Usuário
    Object.entries(userEvents).forEach(([dateKey, events]) => {
      const parts = dateKey.split('-');
      const m = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      
      const eventDate = new Date(currentYear, m - 1, d);
      if (eventDate >= today) {
        events.forEach((ev, idx) => {
          allUpcoming.push({ 
            ...ev, 
            date: eventDate, 
            isHoliday: false,
            id: `user-${dateKey}-${idx}` 
          });
        });
      }
    });

    return allUpcoming
      .sort((a, b) => a.date - b.date)
      .slice(0, limit);
  }, [userEvents]);

  return { 
    getEventsForDay: (dateKey) => {
      const dayHoliday = holidays[dateKey];
      const dayHolidays = dayHoliday ? [{ ...dayHoliday, isHoliday: true }] : [];
      return [...dayHolidays, ...(userEvents[dateKey] || [])];
    }, 
    addUserEvent: (dateKey, newEvent) => {
      setUserEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), { ...newEvent, isHoliday: false }]
      }));
    },
    deleteUserEvent: (dateKey, index) => { /* lógica de delete */ },
    getUpcomingEvents 
  };
};