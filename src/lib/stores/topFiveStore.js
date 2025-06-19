import { defineStore } from "pinia";
import { ref } from "vue";

export const useTopFiveStore = defineStore("topFive", () => {
  const topFiveGames = ref([]);
  const error = ref(null);

  const loadTopFiveGames = () => {
    try {
      const storedTopFiveGames = localStorage.getItem("topFiveGames");
      if (storedTopFiveGames) {
        const parsedGames = JSON.parse(storedTopFiveGames);
        if (Array.isArray(parsedGames) && parsedGames.length <= 5) {
          topFiveGames.value = parsedGames;
        } else {
          topFiveGames.value = parsedGames.slice(0, 5);
          localStorage.setItem(
            "topFiveGames",
            JSON.stringify(topFiveGames.value)
          );
        }
      }
    } catch (err) {
      error.value = err.message || "Error loading top games";
    }
  };

  const addTopFiveGames = (game) => {
    try {
      if (topFiveGames.value.length >= 5) {
        //? debería arrojar un error para que lo atrape el catch
        //? o dejar el catch unicamente para error de localstorage

        error.value =
          "Top 5 is full. Please remove a game before adding a new one.";
        return false;
      }
      if (topFiveGames.value.some((g) => g.id === game.id)) {
        error.value = "This game is already in the top 5";
        return false;
      }
      topFiveGames.value = [...topFiveGames.value, game];
      localStorage.setItem("topFiveGames", JSON.stringify(topFiveGames.value));
      error.value = null;
      return true;
    } catch (err) {
      error.value = err.message || "Error adding top games";
      return false;
    }
  };

  const removeTopFiveGames = (game) => {
    try {
      topFiveGames.value = topFiveGames.value.filter((g) => g.id !== game.id);
      localStorage.setItem("topFiveGames", JSON.stringify(topFiveGames.value));
      error.value = null;
    } catch (err) {
      error.value = err.message || "Error removing top games";
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const isInTopFive = (gameId) =>
    topFiveGames.value.some((g) => g.id === gameId);

  const updateTopFiveOrder = (newOrder) => {
    try {
      topFiveGames.value = [...newOrder];
      localStorage.setItem("topFiveGames", JSON.stringify(topFiveGames.value));
      error.value = null;
    } catch (err) {
      error.value = err.message || "Error updating top games order";
    }
  };

  loadTopFiveGames();

  return {
    topFiveGames,
    addTopFiveGames,
    removeTopFiveGames,
    isInTopFive,
    updateTopFiveOrder,
    topFiveError: error,
    clearError,
  };
});
