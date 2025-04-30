import axios from "axios";

const api = axios.create({
	baseURL: "/api", // Proxy will forward to the backend
	withCredentials: true, // Include cookies
});

export default api;
