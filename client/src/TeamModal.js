import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./Styles/TeamModal.css"; // Import the CSS file with the correct path

const TeamModal = ({ team, isVisible, onClose }) => {
    console.log("Team in TeamModal:", team);
  const [isModalVisible, setIsModalVisible] = useState(isVisible);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    onClose(); // Notify the parent component to close the modal
  };

  return (
    <Modal
      title={team ? team.team: ""}
      visible={isModalVisible}
      onCancel={toggleModal}
      footer={[
        <Button key="close" onClick={toggleModal}>
          Close
        </Button>
      ]}
    >
      {/* Add team information here */}
      <p>Location: {team ? team.location : ""}</p>
      <p>League: {team ? team.league : ""}</p>
      <p>Division: {team ? team.division : ""}</p>
      <p>Conference: {team ? team.conference : ""}</p>
      <p>Mascot: {team ? team.mascot : ""}</p>
      <p>Abbreviation: {team ? team.abbreviation : ""}</p>
      {/* Add more team information fields as needed */}
    </Modal>
  );
};

export default TeamModal;
