import React from 'react';
import './EventCard.css';

const EventCard = ({ event, isActive }) => {
  const day = event.date.getDate();
  const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const month = monthNames[event.date.getMonth()];

  return (
    <div 
      className={`upcoming-event-card ${isActive ? 'active-card' : ''}`}
      style={{
        borderColor: isActive ? '#8b5cf6' : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isActive ? '0 0 30px rgba(139, 92, 246, 0.2)' : 'none',
      }}
    >
      <div className="calendar-date-square">
        <span className="date-day">{day}</span>
        <span className="date-month">{month}</span>
      </div>
      
      <div className="event-info">
        <span className="event-emoji">{event.icon || event.emoji}</span>
      </div>

      <div className="event-texts">
        <h4 className="event-name">{event.name}</h4>
      </div>
    </div>
  );
};

export default EventCard;