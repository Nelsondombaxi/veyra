import React from 'react'
import './modal-container.css'

const ModalContainer = ({ children }) => {
  return (
    <div className="modal-overlay">
      {children}
    </div>
  )
}
export default ModalContainer