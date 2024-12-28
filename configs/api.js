const axios = require("axios");


const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_BASE_URL || "https://sorme-shop.vercel.app/"
    : process.env.DEV_BASE_URL || "http://localhost:3000"; 


const headers = {
  "Content-Type": "application/json",
};


const api = axios.create({
  baseURL: BASE_URL,
  headers,
  timeout: 60000, 
});


module.exports = api;
