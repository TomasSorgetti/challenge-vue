<script>
import { onMounted } from "vue";
import { useGameStore } from "../lib/stores/gameStore";

export default {
  name: "HomeView",
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
  <div v-if="loading" class="text-text">Loading...</div>
  <div v-else-if="error" class="text-red-500">{{ error }}</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="game in games" :key="game.id">
      <router-link :to="{ name: 'detail', params: { id: game.id } }">
        <img :src="game.background_image" :alt="game.name" />
        <h2>{{ game.name }}</h2>
      </router-link>
    </div>
  </div>
</template>
