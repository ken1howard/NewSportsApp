import axios from "axios";

const API_KEY = "77ece1892bmshd978e6e62ba172cp19d063jsn29603d098b67"; // Replace with your API key
const BASE_URL = "https://sportspage-feeds.p.rapidapi.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com",
  },
});

export const fetchNFLTeams = () => {
  return axiosInstance.get("/teams?league=NFL");
};
