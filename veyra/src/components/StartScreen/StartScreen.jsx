import React from 'react'
import './StartScreen.css'

const StartScreen = ({ user, onStart, onCreateAnother, canCreateAnother }) => {
  return (
    <div className="startscreen-overlay">
      <div className="startscreen-card">
        <div className="start-avatar">
          <img src={user?.avatar || '/vite.svg'} alt="avatar" />
        </div>
        <h2 className="start-title">Bem-vindo de volta, {user?.name || 'Usuário'}</h2>
        <p className="start-sub">Pronto para continuar seu trabalho hoje?</p>

        <div className="start-actions">
          <button className="btn btn-primary" onClick={onStart}>Iniciar</button>
          {canCreateAnother && (
            <button className="btn btn-ghost" onClick={onCreateAnother}>Criar outra conta</button>
          )}
        </div>

        <small className="start-note">Os dados apresentados só aparecem porque estão salvos no seu dispositivo.</small>
      </div>
    </div>
  )
}

export default StartScreen
