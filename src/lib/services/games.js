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
    console.error("Error fetching game:", error);
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
