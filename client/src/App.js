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
           <Route index element={<AppContent loading={loading} error={error} selectedTeam={selectedTeam} closeModal={closeModal} />} />
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
}) {
  return (
    <div className="app-container">
      <div className={`app-content`}>
      <Typography.Title level={2} className="pop-out-text">
          NFL Teams
        </Typography.Title>
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
      </div>
{selectedTeam && (
  <TeamModal team={selectedTeam} isVisible={true} onClose={closeModal} />
)}
    </div>
  );
}


export default App;
