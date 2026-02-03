import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import './EventIndicator.css';

const EventIndicator = ({ events = [] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [events]);

  if (!events || events.length === 0) return null;

  const currentEvent = events[index];

  return (
    <div className="emoji-indicator-wrapper">
      <AnimatePresence mode="wait">
        <Motion.div 
          key={index}
          className="emoji-animation-container"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="huge-emoji">{currentEvent.icon || currentEvent.emoji}</span>
          <div className="emoji-glow" style={{ backgroundColor: currentEvent.color || '#8b5cf6' }}></div>
        </Motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EventIndicator;