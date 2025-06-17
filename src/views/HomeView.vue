<script>
/**
 * Componente para mostrar la página de inicio
 *
 * @state
 * - games: Array de objetos { id, name, background_image, ... } desde el store.
 * - loading: Booleano que indica si los datos están cargando.
 * - error: Mensaje de error si la solicitud falla.
 * - fetchGames: Acción para cargar los juegos desde la API cuando se monta el componente.
 */
import { onMounted } from "vue";
import { useGameStore } from "../lib/stores/gameStore";
import GameCard from "../components/GameCard.vue";

export default {
  name: "HomeView",
  components: {
    GameCard,
  },
  setup() {
    const gameStore = useGameStore();
    const { games, loading, error, fetchGames } = gameStore;

    onMounted(() => {
      fetchGames();
    });

    return { games, loading, error, fetchGames };
  },
};
</script>

<template>
  <h1 class="text-primary">Bienvenido a la página de inicio</h1>
  <!-- TODO => skelleton cards -->
  <div v-if="loading" class="text-text">Loading...</div>
  <div v-else-if="error" class="text-red-500">{{ error }}</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <GameCard v-for="game in games" :key="game.id" :game="game" />
  </div>
</template>
