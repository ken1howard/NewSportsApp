import React, { useState, useEffect } from "react";
import { fetchNFLTeams } from "./sportApi";
import "./App.css"; // Import the CSS file

function SportsData() {
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
  }, [retryCount]); // Retry whenever retryCount changes

  console.log("Hello",teams)

  return (
    <div>
      <h1>NFL Teams</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data. Please try again later.</p>
      ) : (
        <ul>
          {teams.map((team, index) => (
  <li key={index}>{team.team}</li>
))}

        </ul>
      )}
    </div>
  );
}

export default SportsData;
