export const API_BASE_URL = import.meta.env.MODE === "development" 
? "http://localhost:3000" 
: "https://indecisive-app.onrender.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;