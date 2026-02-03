import React from 'react';
import { motion as Motion } from 'framer-motion';
import { CaretLeft, CaretRight, Plus, Trash } from "@phosphor-icons/react";

const ModalView = ({ event, onNext, onPrev, currentIndex, totalEvents, onDelete }) => {
  const isHoliday = event?.isHoliday || false;

  return (
    <Motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="modal-view-container"
    >
      <div className="event-display">
        {!isHoliday && (
          <button 
            className="delete-btn-overlay" 
            onClick={() => onDelete(currentIndex)}
            title="Apagar este evento"
          >
            <Trash size={20} weight="bold" />
          </button>
        )}

        <Motion.span 
          className="modal-huge-emoji"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {event?.icon || event?.emoji || '📅'}
        </Motion.span>
        
        <h2 className="event-title">{event?.name}</h2>
        
        <p className="event-description">
          {event?.description || "Sem descrição disponível para este compromisso."}
        </p>
      </div>

      <div className="modal-navigation">
        <button 
          className="nav-btn" 
          onClick={onPrev} 
          disabled={currentIndex === 0}
        >
          <CaretLeft size={24} weight="bold" />
        </button>

        <div className="event-dots">
          {Array.from({ length: totalEvents }).map((_, i) => (
            <div 
              key={i} 
              className={`dot ${currentIndex === i ? 'active' : ''}`} 
            />
          ))}
          <div className="dot plus-dot" />
        </div>

        <button className="nav-btn" onClick={onNext}>
          {currentIndex === totalEvents - 1 ? (
            <Plus size={24} weight="bold" />
          ) : (
            <CaretRight size={24} weight="bold" />
          )}
        </button>
      </div>
    </Motion.div>
  );
};

export default ModalView;