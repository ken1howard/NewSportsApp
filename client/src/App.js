import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import { Button, Typography, List, Select } from "antd";
import {
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { fetchNFLTeams } from "./sportApi";
import "./Styles/App.css";
import LoginPage from "./LoginPage";
import TeamModal from "./TeamModal";
import RegistrationForm from "./RegistrationForm";
import ProfileEditModal from "./EditProfile"; // Import the ProfileEditModal component

const { Option } = Select;

function App() {
  const [teams, setTeams] = useState([]);
  const [nflLogos, setNflLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false); // State for profile edit modal
  const [profileData, setProfileData] = useState({
    name: "", // Initialize with user's profile data
    // Add more profile fields as needed
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNFLTeams();
        const responseData = await response.data;

        if (Array.isArray(responseData.results)) {
          setTeams(responseData.results);
          setLoading(false);
        } else {
          console.error("Results data is not an array:", responseData.results);
          setError("Results data is not an array");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [retryCount]);

  useEffect(() => {
    const fetchNFLLogos = async () => {
      try {
        const response = await fetch("/api/nfl_logos");
        if (response.ok) {
          const logosData = await response.json();
          setNflLogos(logosData);
        } else {
          console.error(
            "Error fetching NFL logos:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching NFL logos:", error);
      }
    };

    fetchNFLLogos();
  }, []);

  const handleTeamSelect = (value) => {
    const selectedTeam = teams.find((team) => team.team === value);

    if (selectedTeam) {
      setSelectedTeam(selectedTeam);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Functions to open and close the profile edit modal
  const openProfileEditModal = () => {
    setProfileEditModalVisible(true);
  };

  const closeProfileEditModal = () => {
    setProfileEditModalVisible(false);
  };

  // Function to save edited profile data
  const handleSaveProfile = (editedData) => {
    // Handle saving the edited profile data here
    // You can send an API request to update the profile
    // and then update the profileData state with the edited data.
    setProfileData({ ...profileData, ...editedData });
    closeProfileEditModal(); // Close the modal after saving
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route
            path="/app"
            element={
              <>
                <nav>
                  <ul>
                    <li>
                      <Link to="/app">Home</Link>
                    </li>
                    <li>
                      <Select
                        placeholder="Select NFL Team"
                        style={{ width: 200 }}
                        onChange={handleTeamSelect}
                      >
                        {teams.map((team) => (
                          <Option key={team.team} value={team.team}>
                            {team.team}
                          </Option>
                        ))}
                      </Select>
                    </li>
                    <li>
                      <Link to="" onClick={openProfileEditModal}>
                        Profile
                      </Link>
                    </li>
                  </ul>
                </nav>
                <Outlet />
              </>
            }
          >
            <Route
              index
              element={
                <AppContent
                  loading={loading}
                  error={error}
                  selectedTeam={selectedTeam}
                  closeModal={closeModal}
                  nflLogos={nflLogos}
                  profileData={profileData}
                />
              }
            />
          </Route>
        </Routes>
      </div>
      {modalVisible && (
        <TeamModal
          team={selectedTeam}
          isVisible={modalVisible}
          onClose={closeModal}
        />
      )}
      {/* Render the ProfileEditModal */}
      {profileEditModalVisible && (
        <ProfileEditModal
          isVisible={profileEditModalVisible}
          onCancel={closeProfileEditModal}
          onSave={handleSaveProfile}
          profileData={profileData}
        />
      )}
    </Router>
  );
}

function AppContent({ loading, error, selectedTeam, closeModal, nflLogos, profileData }) {
  return (
    <div className="app-container">
      <div className={`app-content`}>
        <Typography.Title
          level={1}
          className="pop-out-element"
          style={{
            fontSize: "80px",
            color: "white",
            marginBottom: "80px",
          }}
        >
          NFL Access
        </Typography.Title>
        <div></div>
        <img
          src="https://1000logos.net/wp-content/uploads/2017/05/NFL-Logo-1983.png"
          alt="NFL Logo"
          className="NFLlogo1"
        />
        {loading ? (
          <p style={{ color: "#fff" }}>
            Loading... <LoadingOutlined />
          </p>
        ) : error ? (
          <p style={{ color: "#fff" }}>
            Error fetching data. Please try again later.{" "}
            <ExclamationCircleOutlined />
          </p>
        ) : (
          <List
            dataSource={selectedTeam ? [selectedTeam] : []}
            renderItem={(team) => (
              <List.Item>
                <Button type="link" onClick={() => closeModal()}>
                  {team.team}
                </Button>
              </List.Item>
            )}
          />
        )}

        {/* Display NFL logos */}
        <div className="nfl-logos">
          {nflLogos.map((logo) => (
            <img
              key={logo.team_name}
              src={logo.logo_url}
              alt={logo.team_name}
              className="nfl-logo"
            />
          ))}
        </div>
        <div>
          <h2>User</h2>
          <p>Name: {profileData.name}</p>
          {/* Add more profile fields as needed */}
        </div>
     
      </div>
{selectedTeam && (
  <TeamModal team={selectedTeam} isVisible={true} onClose={closeModal} />
)}
    </div>
  );
}

export default App;

    
