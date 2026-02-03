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

  const getUpcomingEvents = useCallback((limit = 10) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = 2026; 
    let allUpcoming = [];

    Object.entries(holidays).forEach(([dateKey, data]) => {
      const parts = dateKey.split('-');
      const m = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      const eventDate = new Date(currentYear, m - 1, d);
      if (eventDate >= today) {
        allUpcoming.push({ ...data, date: eventDate, isHoliday: true, id: `holiday-${dateKey}` });
      }
    });

    Object.entries(userEvents).forEach(([dateKey, events]) => {
      const parts = dateKey.split('-');
      const m = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      const eventDate = new Date(currentYear, m - 1, d);
      if (eventDate >= today) {
        events.forEach((ev, idx) => {
          allUpcoming.push({ ...ev, date: eventDate, isHoliday: false, id: `user-${dateKey}-${idx}` });
        });
      }
    });

    return allUpcoming.sort((a, b) => a.date - b.date).slice(0, limit);
  }, [userEvents]);

  const deleteUserEvent = (dateKey, globalIndex) => {
    setUserEvents(prev => {
      const hasHoliday = !!holidays[dateKey];
      const realIndex = hasHoliday ? globalIndex - 1 : globalIndex;

      const currentDayEvents = prev[dateKey] ? [...prev[dateKey]] : [];
      
      if (realIndex >= 0 && realIndex < currentDayEvents.length) {
        currentDayEvents.splice(realIndex, 1);
      } else {
        return prev;
      }

      if (currentDayEvents.length === 0) {
        const newEvents = { ...prev };
        delete newEvents[dateKey];
        return newEvents;
      }

      return { ...prev, [dateKey]: currentDayEvents };
    });
  };

  return { 
    getEventsForDay: (dateKey) => {
      const dayHoliday = holidays[dateKey];
      const dayHolidays = dayHoliday ? [{ ...dayHoliday, isHoliday: true }] : [];
      const dayUserEvents = userEvents[dateKey] || [];
      return [...dayHolidays, ...dayUserEvents];
    }, 
    addUserEvent: (dateKey, newEvent) => {
      setUserEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), { ...newEvent, isHoliday: false }]
      }));
    },
    deleteUserEvent,
    getUpcomingEvents 
  };
};