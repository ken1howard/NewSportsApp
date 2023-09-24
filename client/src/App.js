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

const { Option } = Select;

function App() {
  const [teams, setTeams] = useState([]);
  const [nflLogos, setNflLogos] = useState([]); // State to store NFL logos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
    // Fetch NFL logos from your Flask backend
    const fetchNFLLogos = async () => {
      try {
        const response = await fetch("/api/nfl_logos");
        if (response.ok) {
          const logosData = await response.json();
          setNflLogos(logosData);
        } else {
          console.error("Error fetching NFL logos:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching NFL logos:", error);
      }
    };

    fetchNFLLogos(); // Fetch NFL logos when the component mounts
  }, []); // Empty dependency array to fetch only once when the component mounts

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
                  </ul>
                </nav>
                <Outlet />
              </>
            }
          >
           <Route index element={<AppContent loading={loading} error={error} selectedTeam={selectedTeam} closeModal={closeModal} nflLogos={nflLogos} />} />
          </Route>
        </Routes>
      </div>
      {modalVisible && (
        <TeamModal team={selectedTeam} isVisible={modalVisible} onClose={closeModal} />
      )}
    </Router>
  );
}

function AppContent({
  loading,
  error,
  selectedTeam,
  closeModal,
  nflLogos,
}) {
  return (
    <div className="app-container">
      <div className={`app-content`}>
      <Typography.Title level={1} className="pop-out-element"
      style={{ fontSize: '80px', color: 'white',  marginBottom: '80px'}}>
          NFL Access
        </Typography.Title>
        <div></div>
        <img src="https://1000logos.net/wp-content/uploads/2017/05/NFL-Logo-1983.png" alt="NFL Logo" className="NFLlogo1" />
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
      </div>
{selectedTeam && (
  <TeamModal team={selectedTeam} isVisible={true} onClose={closeModal} />
)}
    </div>
  );
}

export default App;
