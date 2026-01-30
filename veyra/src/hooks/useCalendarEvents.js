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
    const dayHolidays = holidays[dateKey] ? [holidays[dateKey]] : [];
    const dayUserEvents = userEvents[dateKey] ? userEvents[dateKey] : [];
    return [...dayHolidays, ...dayUserEvents];
  };

  const addUserEvent = (dateKey, newEvent) => {
    setUserEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));
  };

  return { getEventsForDay, addUserEvent };
};