import axios from "axios";

export const api = axios.create({
  baseURL: 'https://4bdn8u070f.execute-api.us-east-1.amazonaws.com',
  headers: {
    'Content-Type': 'application/json'
  }
})