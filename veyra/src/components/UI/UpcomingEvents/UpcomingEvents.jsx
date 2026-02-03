import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarEvents } from '../../../hooks/useCalendarEvents';
import EventCard from '../EventCard/EventCard';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const { getUpcomingEvents } = useCalendarEvents();
  const events = getUpcomingEvents(5);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) return null;

  return (
    <div className="upcoming-events-container">
      <div className="carousel-track-flat">
        <AnimatePresence mode="wait">
          {events.map((event, index) => {
            const isCenter = index === activeIndex;
            
            return (
              <motion.div
                key={event.id || index}
                className="carousel-item-flat"
                animate={{
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.4,
                  filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={() => setActiveIndex(index)}
              >
                <EventCard event={event} isActive={isCenter} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UpcomingEvents;