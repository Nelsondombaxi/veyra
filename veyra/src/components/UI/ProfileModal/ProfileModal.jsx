import React, { useState } from "react";
import InputField from "../InputField/InputField";
import AvatarUpload from "../AvatarUpload/AvatarUpload";
import Button from "../Button/button";
import "./ProfileModal.css";

const ProfileModal = ({ onLoginSuccess }) => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem("veyra_user") : null;
  const [isRegistered, setIsRegistered] = useState(() => !!saved);
  const [user, setUser] = useState(() => (saved ? JSON.parse(saved) : { name: "", surname: "", role: "", avatar: "" }));

  const handleSave = () => {
    if (user?.name && user?.surname && user?.role) {
      localStorage.setItem("veyra_user", JSON.stringify(user));
      onLoginSuccess(user);
    } else {
      alert("Por favor, preencha o Nome, Sobrenome e a sua Função!");
    }
  };

  const handleEnter = () => {
    onLoginSuccess(user);
  };

  const handleReset = () => {
    localStorage.removeItem("veyra_user");
    setIsRegistered(false);
    setUser({ name: "", surname: "", role: "", avatar: "" });
  };

  if (isRegistered) {
    return (
      <div className="profile-modal welcome-mode">
        <header className="modal-header">
          <h2 className="modal-title">Veyra</h2>
          <p className="modal-subtitle">Bom te ver de volta!</p>
        </header>

        <div className="avatar-section-wrapper">
          <div className="avatar-display-final">
            <img src={user?.avatar || ''} alt="User" className="avatar-img-fixed" />
          </div>
        </div>

        <div className="welcome-text">
          {/* Mostra Nome e Sobrenome dinâmicos */}
          <h3>{user?.name} {user?.surname}</h3>
          <span>{user?.role}</span>
        </div>

        <div className="modal-footer">
          <Button label="Acessar Sistema" onClick={handleEnter} />
          <button className="change-profile-btn" onClick={handleReset}>
            Trocar de Perfil
          </button>
        </div>
      </div>
    );
  }

  // MODO: REGISTO (Primeiro acesso)
  return (
    <div className="profile-modal">
      <header className="modal-header">
        <h2 className="modal-title">Veyra</h2>
        <p className="modal-subtitle">Crie sua identidade local.</p>
      </header>

      <div className="avatar-section-wrapper">
        <AvatarUpload
          onImageUpload={(img) => setUser({ ...user, avatar: img })}
        />
      </div>

      <div className="form-group">
        <InputField
          label="Nome"
          value={user?.name || ''}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <InputField
          label="Sobrenome"
          value={user?.surname || ''}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
        />
        <InputField
          label="Função"
          value={user?.role || ''}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        />
      </div>

      <div className="modal-footer">
        <Button label="Criar Perfil" onClick={handleSave} />
      </div>
    </div>
  );
};

export default ProfileModal;