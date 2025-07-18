import axios from "axios"

const api = axios.create({
  baseURL: 'http://138.99.7.27:3000/api',
  timeout: 3000
});

export default api