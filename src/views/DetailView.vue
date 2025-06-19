<script setup>
/**
 * Componente para mostrar el detalle de un videojuego
 *
 */
import { onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "../lib/stores/gameStore";
import { useRoute } from "vue-router";

const route = useRoute();
const gameStore = useGameStore();
const { currentGame, loading, error } = storeToRefs(gameStore);
const { fetchGameById } = gameStore;

onMounted(async () => {
  const gameId = Number(route.params.id);
  if (isNaN(gameId) || gameId <= 0) {
    error.value = "Invalid game ID";
    return;
  }
  if (currentGame.value && currentGame.value.id === gameId) return;

  loading.value = true;
  try {
    await fetchGameById(gameId);
  } catch (err) {
    error.value = err.message || "Error to fetch game";
    console.error("onMounted error:", err);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  gameStore.$patch({
    currentGame: null,
    error: null,
    loading: false,
  });
});
</script>

<template>
  <main class="w-full py-16 container mx-auto">
    <!-- Loading -->
    <div v-if="loading" class="text-text text-center">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
        <div
          class="h-64 bg-gray-300 rounded w-full max-w-2xl mx-auto mb-4"
        ></div>
        <div class="h-4 bg-gray-300 rounded w-5/6 mx-auto mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-4/6 mx-auto"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else-if="currentGame" class="p-4">
      <h1 class="text-3xl font-bold text-text">{{ currentGame.name }}</h1>
      <img
        v-if="currentGame.background_image"
        :src="currentGame.background_image"
        :alt="currentGame.name"
        class="w-full max-w-2xl h-auto rounded mt-4"
      />
      <p v-if="currentGame.description_raw" class="mt-4 text-text max-w-2xl">
        {{ currentGame.description_raw.substring(0, 300) + "..." }}
      </p>
      <p v-if="currentGame.released" class="mt-2 text-text">
        Fecha de lanzamiento: {{ currentGame.released }}
      </p>
      <p v-if="currentGame.rating" class="mt-2 text-text">
        Calificación: {{ currentGame.rating }}/5
      </p>
    </div>
    <div v-else class="text-text text-center">Game not found.</div>
  </main>
</template>
