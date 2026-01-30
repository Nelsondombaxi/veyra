// src/components/UI/EventIndicator/EventIndicator.jsx
import React from 'react';
import { motion as Motion } from 'framer-motion';
import './EventIndicator.css';

const EventIndicator = ({ event }) => {
  if (!event) return null;

  // Animação simples para o emoji não ficar parado
  const animation = {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <Motion.div 
      className="emoji-indicator-wrapper"
      animate={animation}
      title={event.name} // Mostra o nome ao passar o rato
    >
      <span className="huge-emoji">{event.icon}</span>
      {/* Brilho colorido atrás do emoji para destacar no tema dark */}
      <div className="emoji-glow" style={{ backgroundColor: event.color }}></div>
  </Motion.div>
  );
};

export default EventIndicator;