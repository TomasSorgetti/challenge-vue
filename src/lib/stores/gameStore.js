import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllGames, getPopularGames, getGameById } from "../services/games";

export const useGameStore = defineStore("game", () => {
  const games = ref([]);
  const popularGames = ref([]);
  const currentGame = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const hasMoreGames = ref(true);
  const currentPage = ref(1);

  const platform = ref(null);
  const ordering = ref(null);

  const fetchGames = async (page = 1, append = false) => {
    error.value = null;
    try {
      const result = await getAllGames(
        page,
        21,
        platform.value,
        ordering.value
      );
      if (append) {
        games.value = [...games.value, ...result];
      } else {
        games.value = result;
      }
      hasMoreGames.value = result.length > 0;
      currentPage.value = page;
    } catch (err) {
      error.value = err.message || "Error fetching games";
      hasMoreGames.value = false;
    }
  };

  const setPlatform = (newPlatform) => {
    platform.value = newPlatform;
    currentPage.value = 1;
    games.value = [];
    hasMoreGames.value = true;
    fetchGames(1, false);
  };

  const setOrdering = (newOrdering) => {
    ordering.value = newOrdering;
    currentPage.value = 1;
    games.value = [];
    hasMoreGames.value = true;
    fetchGames(1, false);
  };

  const fetchPopularGames = async () => {
    error.value = null;
    try {
      const result = await getPopularGames();
      popularGames.value = result;
    } catch (err) {
      error.value = err.message || "Error fetching popular games";
    }
  };

  const fetchGameById = async (id) => {
    error.value = null;
    loading.value = true;
    try {
      currentGame.value = await getGameById(id);
    } catch (err) {
      error.value = err.message || "Error fetching game";
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
    hasMoreGames,
    currentPage,
    fetchGames,
    fetchPopularGames,
    fetchGameById,
    setPlatform,
    setOrdering,
    ordering,
    platform,
  };
});
