import axios from "axios"
const url_back = import.meta.env.VITE_URL_BACK 

const api = axios.create({
  baseURL: url_back,
  // timeout: 3000
});

export default api