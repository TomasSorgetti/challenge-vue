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
        error.value = "Top 5 is full";
        return;
      }
      if (topFiveGames.value.some((g) => g.id === game.id)) {
        error.value = "This game is already in the top 5";
        return;
      }
      topFiveGames.value = [...topFiveGames.value, game];
      localStorage.setItem("topFiveGames", JSON.stringify(topFiveGames.value));
    } catch (err) {
      error.value = err.message || "Error adding top games";
    }
  };

  const removeTopFiveGames = (game) => {
    try {
      topFiveGames.value = topFiveGames.value.filter((g) => g.id !== game.id);
      localStorage.setItem("topFiveGames", JSON.stringify(topFiveGames.value));
    } catch (err) {
      error.value = err.message || "Error removing top games";
    }
  };

  const isInTopFive = (gameId) =>
    topFiveGames.value.some((g) => g.id === gameId);

  loadTopFiveGames();

  return {
    topFiveGames,
    addTopFiveGames,
    removeTopFiveGames,
    isInTopFive,
    topFiveError: error,
  };
});
