import React from 'react';
import './Showcase.css';

const Showcase = ({ title, children, icon: Icon }) => {
  return (
    <section className="showcase-container">
      <div className="showcase-header">
        <div className="showcase-title-wrapper">
          {Icon && <Icon className="showcase-icon" />}
          <h2 className="showcase-title">{title}</h2>
        </div>
        <div className="showcase-line"></div>
      </div>
      
      <div className="showcase-content">
        {children}
      </div>
    </section>
  );
};

export default Showcase;