import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

// Autenticación de usuario
export const authenticateUser = async ({ cif, contraseña }) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {
      cif,
      contraseña,
    });
    console.log("🔍 Response del backend (auth):", response.data); // <--- línea clave
    return response.data === true;
  } catch (error) {
    console.error("Error en autenticación:", error);
    return false;
  }
};

// Obtener datos del usuario autenticado por CIF
export const fetchUserByCif = async (cif) => {
  try {
    const response = await axios.get(`${API_URL}/info/${cif}`);
    return response.data; // UsuarioResponseDTO esperado
  } catch (error) {
    console.error("Error al obtener usuario por CIF:", error);
    return null;
  }
};
