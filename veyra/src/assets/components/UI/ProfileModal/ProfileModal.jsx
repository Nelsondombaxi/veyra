import React from 'react'
import InputField from "../InputField/InputField"
import AvatarUpload from "../AvatarUpload/AvatarUpload"
import Button from "../Button/button"
import './ProfileModal.css'

const ProfileModal = () => {
  return (
    <div className="profile-modal">
      <header className="modal-header">
        <h2 className="modal-title">Veyra</h2>
        <p className="modal-subtitle">
          Sua central de organização.<br/>
          Crie sua identidade local.
        </p>
      </header>

      <div className="avatar-section-wrapper">
        <AvatarUpload />
      </div>

      <div className="form-group">
        <InputField label="Nome" placeholder="Seu primeiro nome" />
        <InputField label="Sobrenome" placeholder="Seu sobrenome" />
        <InputField label="Função" placeholder="Ex: Desenvolvedor, Designer..." />
      </div>

      <div className="modal-footer">
        <Button label="Entrar no Sistema" onClick={() => {}} />
      </div>
    </div>
  )
}

export default ProfileModal