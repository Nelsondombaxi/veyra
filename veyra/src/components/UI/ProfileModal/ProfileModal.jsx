import React, { useState } from "react";
import InputField from "../InputField/InputField";
import AvatarUpload from "../AvatarUpload/AvatarUpload";
import Button from "../Button/button";
import "./ProfileModal.css";

// Recebemos a prop onLoginSuccess
const ProfileModal = ({ onLoginSuccess }) => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem("veyra_user") : null;
  const [isRegistered, setIsRegistered] = useState(() => !!saved);
  const [user, setUser] = useState(() => (saved ? JSON.parse(saved) : { name: "", surname: "", role: "", avatar: "" }));

  // Função para salvar e JÁ ENTRAR
  const handleSave = () => {
    if (user?.name && user?.role) {
      localStorage.setItem("veyra_user", JSON.stringify(user));
      onLoginSuccess(user); // Faz o App trocar para a Dashboard na hora
    } else {
      alert("Preencha seu nome e função!");
    }
  };

  // Função para entrar quando já tem cadastro
  const handleEnter = () => {
    onLoginSuccess(user); // Faz o App trocar para a Dashboard na hora
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
          <h3>{user?.name} {user?.surname}</h3>
          <span>{user?.role}</span>
        </div>

        <div className="modal-footer">
          {/* Usamos o handleEnter aqui */}
          <Button label="Acessar Sistema" onClick={handleEnter} />
          <button className="change-profile-btn" onClick={handleReset}>
            Trocar de Perfil
          </button>
        </div>
      </div>
    );
  }

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
        {/* Alterado para handleSave */}
        <Button label="Criar Perfil" onClick={handleSave} />
      </div>
    </div>
  );
};

export default ProfileModal;