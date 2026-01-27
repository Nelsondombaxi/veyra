import React from 'react'
import ModalContainer from "../../components/Layout/ModalContainer/modal-container"
import ProfileModal from "../../components/UI/ProfileModal/ProfileModal"
import './FirstAccess.css'

const FirstAccess = () => {
  return (
    <div className="first-access-page">
      <ModalContainer>
        <ProfileModal />
      </ModalContainer>
    </div>
  )
}

export default FirstAccess