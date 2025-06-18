<script>
/**
 * Componente para mostrar la página de inicio
 *
 * @state
 * - games: Array de objetos { id, name, background_image, ... } desde el store.
 * - loading: Booleano que indica si los datos están cargando.
 * - error: Mensaje de error si la solicitud falla.
 * - fetchGames: Acción para cargar los juegos desde la API cuando se monta el componente.
 * - fetchPopularGames: Acción para cargar los juegos populares desde la API cuando se monta el componente.
 */
import { onMounted } from "vue";
import { useGameStore } from "../lib/stores/gameStore";
import { storeToRefs } from "pinia";
import GameCard from "../components/GameCard.vue";
import PopularGames from "../components/PopularGames.vue";

export default {
  name: "HomeView",
  components: {
    GameCard,
    PopularGames,
  },
  setup() {
    const gameStore = useGameStore();
    // propiedades reactivas
    const { games, popularGames, loading, error } = storeToRefs(gameStore);
    // propiedades computadas
    const { fetchGames, fetchPopularGames } = gameStore;

    onMounted(async () => {
      if (games.value.length > 0 && popularGames.value.length > 0) return;
      loading.value = true;
      try {
        await Promise.all([fetchGames(), fetchPopularGames()]);
      } catch (err) {
        error.value = err.message || "Error al cargar los juegos";
        console.error("onMounted error:", err);
      } finally {
        loading.value = false;
      }
    });

    return {
      games,
      popularGames,
      loading,
      error,
    };
  },
};
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-primary">Bienvenido a la página de inicio</h1>
    <div v-if="loading" class="text-text mt-12">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <PopularGames :games="popularGames" />
      <h2 class="text-2xl font-bold mb-4 mt-8">Tous les jeux</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GameCard v-for="game in games" :key="game.id" :game="game" />
      </div>
    </div>
  </main>
</template>
