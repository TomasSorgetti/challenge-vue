import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllGames, getPopularGames, getGameById } from "../services/games";

export const useGameStore = defineStore("game", () => {
  const games = ref([]);
  const popularGames = ref([]);
  const currentGame = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchGames = async (page = 1) => {
    error.value = null;
    try {
      const result = await getAllGames(page);
      games.value = result;
    } catch (err) {
      error.value = err.message;
      console.error("fetchGames error:", err);
    }
  };

  const fetchPopularGames = async () => {
    error.value = null;
    try {
      const result = await getPopularGames();
      popularGames.value = result;
    } catch (err) {
      error.value = err.message;
      console.error("fetchPopularGames error:", err);
    }
  };

  const fetchGameById = async (id) => {
    error.value = null;
    loading.value = true;
    try {
      currentGame.value = await getGameById(id);
    } catch (err) {
      error.value = err.message;
      console.error("fetchGameById error:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    games,
    popularGames,
    currentGame,
    loading,
    error,
    fetchGames,
    fetchPopularGames,
    fetchGameById,
  };
});
