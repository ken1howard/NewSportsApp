import React, { useState, useEffect } from "react";
import { Button, Typography, List } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchNFLTeams } from "./sportApi"; // Import your data fetching function
import "./App.css"; // Import the App.css stylesheet

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const maxRetries = 3; // Maximum number of retries
    const retryInterval = 2000; // Initial retry interval in milliseconds (2 seconds)

    const fetchData = async () => {
      try {
        const response = await fetchNFLTeams();

        if (response.status === 429 && retryCount < maxRetries) {
          // If rate limited, retry with exponential backoff
          setRetryCount(retryCount + 1);
          const waitTime = Math.pow(2, retryCount) * retryInterval;
          setTimeout(() => {
            fetchData(); // Retry the request after the wait time
          }, waitTime);
        } else {
          // If not rate limited, process the data
          const responseData = await response.data;
          console.log("API Response Data:", responseData); // Log the entire response
          if (Array.isArray(responseData.results)) {
            setTeams(responseData.results); // Use the "results" array as teams
            setLoading(false);
          } else {
            console.error("Results data is not an array:", responseData.results);
            setError("Results data is not an array");
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [retryCount]);

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
            Error fetching data. Please try again later. <ExclamationCircleOutlined />
          </p>
        ) : (
          <List
            dataSource={teams}
            renderItem={(team) => (
              <List.Item>
                <Button type="link">{team.team}</Button>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}

export default App;
