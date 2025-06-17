<script>
import { onMounted } from "vue";
import { useGameStore } from "../lib/stores/gameStore";
import { useRoute } from "vue-router";

export default {
  name: "DetailView",
  setup() {
    const route = useRoute();
    const gameStore = useGameStore();
    const { currentGame, loading, error, fetchGameById } = gameStore;

    onMounted(() => {
      const id = route.params.id;
      if (!id || isNaN(id)) {
        gameStore.error = "ID de juego inválido";
        return;
      }
      fetchGameById(Number(id));
    });

    return { currentGame, loading, error, fetchGameById };
  },
};
</script>

<template>
  <div>
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
    <div v-else="currentGame" class="p-4">
      <h1 class="text-2xl font-bold">{{ currentGame.name }}</h1>
      <img
        :src="currentGame.background_image || 'https://via.placeholder.com/300'"
        :alt="currentGame.name"
        class="w-full max-w-md h-auto rounded mt-4"
      />
    </div>
    <div v-else class="text-text">No se encontró el juego.</div>
  </div>
</template>
