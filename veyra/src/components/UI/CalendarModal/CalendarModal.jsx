import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from "@phosphor-icons/react";
import ModalView from './ModalView';
import ModalAdd from './ModalAdd';
import './CalendarModal.css';

const CalendarModal = ({ isOpen, onClose, events, dateKey, onAddEvent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const isAdding = currentIndex === events.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <Motion.div 
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" onClick={onClose}><X weight="bold"/></button>

        <AnimatePresence mode="wait">
          {isAdding ? (
            <ModalAdd 
              key="add" 
              dateKey={dateKey} 
              onSave={(newEvent) => {
                onAddEvent(dateKey, newEvent);
                onClose();
              }} 
              onBack={() => setCurrentIndex(0)}
            />
          ) : (
            <ModalView 
              key="view"
              event={events[currentIndex]}
              onNext={() => setCurrentIndex(prev => prev + 1)}
              onPrev={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              currentIndex={currentIndex}
              totalEvents={events.length}
            />
          )}
        </AnimatePresence>
      </Motion.div>
    </div>
  );
};

export default CalendarModal;