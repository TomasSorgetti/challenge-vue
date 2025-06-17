import { URL_BASE, API_KEY } from "../constants/index";

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

export const getGameById = async (id) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const response = await fetch(`${URL_BASE}/games/${id}?key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};
