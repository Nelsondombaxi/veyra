import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import './AutoCarousel.css';

const AutoCarousel = ({ items }) => {
  const INTERVAL_TIME = 5000; // 5 segundos
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    let startTime = localStorage.getItem('@veyra:carousel_start');
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem('@veyra:carousel_start', startTime);
    }

    const calculateIndex = () => {
      const elapsed = Date.now() - parseInt(startTime);
      const ticks = Math.floor(elapsed / INTERVAL_TIME);
      return ticks % items.length;
    };

    setCurrentIndex(calculateIndex());

    const interval = setInterval(() => {
      setCurrentIndex(calculateIndex());
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) {
    return (
      <div className="carousel-empty">
        <p>Nenhum destaque para exibir no momento.</p>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[currentIndex]?.id || 'empty'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="carousel-active-item"
        >
          <ProjectCard {...items[currentIndex]} hideDelete={true} />
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${index === currentIndex ? 'active' : ''}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCarousel;