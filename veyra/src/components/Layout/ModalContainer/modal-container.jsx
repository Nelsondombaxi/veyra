/* src/components/Layout/ModalContainer/modal-container.js */
import React from 'react'
import './modal-container.css'

const ModalContainer = ({ children }) => {
  return (
    <div className="modal-overlay">
      {/* Removemos a div wrapper extra ou a deixamos transparente no CSS */}
      {children}
    </div>
  )
}
export default ModalContainer