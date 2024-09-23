// import axios from "axios";

// const baseURL = process.env.BASE_URL;

// const headers = {
//   "Content-Type": "application/json",
// };

// const api = axios.create({
//   baseURL,
//   headers,
//   timeout: 60000,
// });

// export default api;


const axios = require("axios");

const checkConfig = (server) => {
  let config = {};
  switch (server) {
    case "production":
      config = {
        baseURL: "https://sorme-shop.vercel.app/",
      };
      break;
    case "local":
      config = {
        baseURL: "http://localhost:3001",
      };
      break;
    default:
      break;
  }
  return config;
};

const selectServer = "local";
const { baseURL } = checkConfig(selectServer);

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL,
  headers,
  timeout: 60000,
});

module.exports = api;
