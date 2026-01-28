import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import './AutoCarousel.css';

const AutoCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

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
          key={items[currentIndex].id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="carousel-active-item"
        >
          {/* Reutilizamos o seu ProjectCard que já tem o estilo Fortnite */}
          <ProjectCard {...items[currentIndex]} hideDelete={true} />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de bolinha para saber quantos cards tem */}
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