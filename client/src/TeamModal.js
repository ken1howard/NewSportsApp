// TeamModal.js
import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./Styles/TeamModal.css"; // Import the CSS file with the correct path

const TeamModal = ({ team, isVisible, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    onClose(); // Notify the parent component to close the modal
  };

  return (
    <Modal
      title={
        <h2 className="centered-title">{team ? team.team : ""}</h2>
      }
      visible={isModalVisible}
      onCancel={toggleModal}
      footer={[
        <Button key="close" onClick={toggleModal}>
          Close
        </Button>
      ]} className="modal-with-border" 
    >
      {/* Add team information here */}
      <p className="modal-paragraph">Location: {team ? team.location : ""}</p>
      <p className="modal-paragraph">League: {team ? team.league : ""}</p>
      <p className="modal-paragraph">Division: {team ? team.division : ""}</p>
      <p className="modal-paragraph">Conference: {team ? team.conference : ""}</p>
      <p className="modal-paragraph">Mascot: {team ? team.mascot : ""}</p>
      <p className="modal-paragraph">Abbreviation: {team ? team.abbreviation : ""}</p>
      {/* Add more team information fields as needed */}
    </Modal>
  );
};

export default TeamModal;
