import React from 'react'
import './button.css'

const Button = ({ label, onClick, type = "button" }) => {
  return (
    <button 
      className="veyra-button" 
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  )
}

export default Button