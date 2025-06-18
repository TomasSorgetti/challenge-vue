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
        error.value = err.message || "Error al cargar el juego";
        console.error("onMounted error:", err);
      } finally {
        loading.value = false;
      }
    });

    return { currentGame, loading, error };
  },
};
</script>

<template>
  <main class="w-full py-16 container mx-auto">
    <!-- Loading -->
    <div v-if="loading" class="text-text text-center">
      <!-- TODO : Loading skeleton -->
      Cargando...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
      <button
        @click="
          async () => {
            error.value = null;
            loading.value = true;
            try {
              await fetchGameById(Number($route.params.id));
            } catch (err) {
              error.value = err.message || 'Error al cargar el juego';
            } finally {
              loading.value = false;
            }
          }
        "
        class="ml-2 text-blue-500 underline"
      >
        Try again
      </button>
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
    <div v-else class="text-text text-center">No se encontró el juego.</div>
  </main>
</template>
