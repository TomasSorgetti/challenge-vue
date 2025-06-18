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
  <section class="w-full mt-20">
    <div v-if="loading" class="text-text text-center">
      Cargando juegos populares...
    </div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else-if="games.length === 0" class="text-text text-center">
      No se encontraron juegos populares.
    </div>
    <div v-else class="flex justify-between gap-2">
      <div class="bg-red-500 w-full max-w-[1000px]"></div>
      <ul class="flex flex-col items-start justify-start gap-2">
        <li v-for="game in games" :key="game.id" class="w-full">
          <button
            @click="setActiveGame(game.id)"
            :class="[
              'flex items-center gap-2 p-4 w-full rounded-2xl text-text',
              activeGame === game.id ? 'bg-primary-dark' : 'bg-primary',
            ]"
          >
            <div class="w-[50px] overflow-hidden h-[70px] rounded-sm">
              <img
                v-if="game.background_image"
                :src="game.background_image"
                :alt="game.name"
                class="object-cover w-full h-full"
              />
            </div>
            <h2 class="max-w-[140px] text-[16px] text-left">{{ game.name }}</h2>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
