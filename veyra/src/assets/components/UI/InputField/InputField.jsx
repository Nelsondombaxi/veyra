import React from 'react'
import './InputField.css'

const InputField = ({ label, placeholder, type = 'text', value, onChange }) => {
  const inputId = `input-${label.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="input-field-wrapper">
      <label htmlFor={inputId} className="input-label">
        {label}
      </label>
      <input 
        id={inputId}
        className="input-field" 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  )
}

export default InputField