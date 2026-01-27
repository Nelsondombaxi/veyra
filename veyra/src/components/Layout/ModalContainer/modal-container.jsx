import React from 'react'
import './modal-container.css'

const ModalContainer = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        {children}
      </div>
    </div>
  )
}

export default ModalContainer