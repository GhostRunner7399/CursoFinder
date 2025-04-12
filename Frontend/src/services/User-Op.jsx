import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

// Register user
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}action/register`, userData);
    return response.data;
};

// Authenticate user
export const authenticateUser = async (userData) => {
    const response = await axios.post(`${API_URL}auth`, userData);
    return response.data; // Assuming this returns true/false
};

// Fetch user by CIF
export const fetchUserByCif = async (cif) => {
    const response = await axios.get(`${API_URL}info/${cif}`);
    return response.data;
};

// Fetch all users
export const fetchAllUsers = async () => {
    const response = await axios.get(`${API_URL}all`);
    return response.data;
};
