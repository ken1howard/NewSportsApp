import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./TeamModal.css"; // Import the CSS file with the correct path


const TeamModal = ({ team, isVisible, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    onClose(); // Notify the parent component to close the modal
  };

  return (
    <Modal
      title={`${team.team}`}
      visible={isModalVisible}
      onCancel={toggleModal}
      footer={[
        <Button key="close" onClick={toggleModal}>
          Close
        </Button>
      ]}
    >
      {/* Add team information here */}
    <p> Location: {team.location}</p>
    <p> League: {team.league}</p>
    <p> Division: {team.division}</p>
    <p> Conference: {team.conference}</p>
    <p> Macot: {team.mascot}</p>
    <p> Abbreviation: {team.abbreviation}</p>
      {/* Add more team information fields as needed */}
    </Modal>
  );
};

export default TeamModal;
