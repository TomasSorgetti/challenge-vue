import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllGames, getGameById } from "../services/games";

/**
 * Función para manejar el estado de games
 *
 * @returns {Object} games, currentGame, loading, error, fetchGames, fetchGameById
 */
export const useGameStore = defineStore("game", () => {
  const games = ref([]);
  const currentGame = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchGames = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
      games.value = await getAllGames(page);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchGameById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      currentGame.value = await getGameById(id);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { games, currentGame, loading, error, fetchGames, fetchGameById };
});
