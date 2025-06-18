import { URL_BASE, API_KEY } from "../constants/index";

/**
 * Obtiene una lista de juegos
 * @param {number} page
 * @returns
 */
export const getAllGames = async (page = 1) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const response = await fetch(
      `${URL_BASE}/games?key=${API_KEY}&page=${page}`
    );

    if (!response.ok) throw new Error("Failed to fetch games");
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

/**
 * Obtiene los juegos más populares
 * @param {number} size
 *
 */
export const getPopularGames = async (size = 5) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const response = await fetch(
      `${URL_BASE}/games?key=${API_KEY}&ordering=-rating&page_size=${size}`
    );
    if (!response.ok) throw new Error("Failed to fetch most popular games");
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

/**
 * Obtiene un juego por su ID
 * @param {number} id
 * @returns
 */
export const getGameById = async (id) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const response = await fetch(`${URL_BASE}/games/${id}?key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch game");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

/**
 * Retrasa la ejecución de una función
 * @param {number} ms
 * @returns
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Busca juegos en la API por su nombre
 * @param {string} query
 * @param {number} pageSize
 * @returns
 */
export const searchGames = async (query, pageSize = 5) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");
    if (!query) throw new Error("Search query is required");

    await delay(500); // Avoid rate limits
    const response = await fetch(
      `${URL_BASE}/games?key=${API_KEY}&search=${encodeURIComponent(
        query
      )}&page_size=${pageSize}`
    );
    if (!response.ok) throw new Error("Failed to fetch search results");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching games:", error);
    throw error;
  }
};
