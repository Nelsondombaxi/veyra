import React from 'react'
import './AvatarUpload.css'

const AvatarUpload = () => {
  return (
    <div className="avatar-upload-wrapper">
      <input 
        type="file" 
        id="avatar-input" 
        className="avatar-hidden-input" 
        accept="image/*" 
      />
      
      <label htmlFor="avatar-input" className="avatar-circle">
        <svg className="react-logo-icon" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      </label>

      <span className="avatar-hint">Escolher Imagem</span>
    </div>
  )
}

export default AvatarUpload