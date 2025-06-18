<script>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "../lib/stores/gameStore";
import { useRoute } from "vue-router";

export default {
  name: "DetailView",
  setup() {
    const route = useRoute();
    const gameStore = useGameStore();
    const { currentGame, loading, error } = storeToRefs(gameStore);
    const { fetchGameById } = gameStore;

    onMounted(() => {
      const gameId = route.params.id;
      if (!gameId) {
        gameStore.error = "Id not found";
        return;
      }
      if (currentGame && currentGame?.value?.id == gameId) return;
      try {
        fetchGameById(Number(gameId));
      } catch (err) {
        error.value = err.message || "Error to load game";
        console.error("onMounted error:", err);
      }
    });

    return { currentGame, loading, error };
  },
};
</script>

<template>
  <main class="container mx-auto pt-20">
    <div v-if="loading" class="text-text animate-pulse">Cargando...</div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
      <button
        @click="fetchGameById(Number($route.params.id))"
        class="ml-2 text-blue-500"
      >
        Reintentar
      </button>
    </div>
    <div v-else-if="currentGame && currentGame.name" class="p-4">
      <h1 class="text-2xl font-bold">{{ currentGame.name }}</h1>
      <img
        v-if="currentGame.background_image"
        :src="currentGame.background_image"
        :alt="currentGame.name"
        class="w-full max-w-md h-auto rounded mt-4"
      />
    </div>
    <div v-else class="text-text">No se encontró el juego.</div>
  </main>
</template>
