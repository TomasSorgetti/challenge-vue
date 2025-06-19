<script setup>
import { onMounted } from "vue";
import { useGameStore } from "../lib/stores/gameStore";
import { storeToRefs } from "pinia";
import GameCard from "../components/GameCard.vue";
import PopularGames from "../components/PopularGames.vue";
import PopularSkeleton from "../components/skeletons/PopularSkeleton.vue";
import GameCardSkeleton from "../components/skeletons/GameCardSkeleton.vue";
import SearchBar from "../components/SearchBar.vue";

const gameStore = useGameStore();
const { games, popularGames, loading, error } = storeToRefs(gameStore);
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
</script>

<template>
  <main class="container mx-auto p-4">
    <h1
      class="text-light-text-color mt-32 text-4xl max-w-[500px] md:text-5xl lg:text-6xl lg:max-w-[630px] font-bold uppercase"
    >
      find all the games in one place
    </h1>

    <!-- Loading skeleton -->
    <div v-if="loading">
      <PopularSkeleton />
      <GameCardSkeleton />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Content -->
    <div v-else>
      <PopularGames :games="popularGames" :loading="loading" :error="error" />
      <SearchBar />
      <h2 class="text-2xl font-bold mb-4 mt-8">Filter by:</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GameCard v-for="game in games" :key="game.id" :game="game" />
      </div>
    </div>
  </main>
</template>
