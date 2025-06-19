<!--
  Componente HomeView
  - Muestra una página principal con juegos populares, una barra de búsqueda y una lista de juegos con carga infinita.
  - Props: Ninguna.
  - Dependencias:
    - Pinia para useGameStore y useTopFiveStore.
    - Componentes GameCard, PopularGames, PopularSkeleton, GameCardSkeleton, SearchBar.
-->
<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import { useGameStore } from "../lib/stores/gameStore";
import { useTopFiveStore } from "../lib/stores/topFiveStore";
import { storeToRefs } from "pinia";
import GameCard from "../components/GameCard.vue";
import PopularGames from "../components/PopularGames.vue";
import PopularSkeleton from "../components/skeletons/PopularSkeleton.vue";
import GameCardSkeleton from "../components/skeletons/GameCardSkeleton.vue";
import SearchBar from "../components/SearchBar.vue";

// Game store
const gameStore = useGameStore();
const { games, popularGames, loading, error, hasMoreGames, currentPage } =
  storeToRefs(gameStore);
const { fetchGames, fetchPopularGames } = gameStore;

// TopFive store
const { isInTopFive } = useTopFiveStore();

// Scroll
const loadingMore = ref(false);
const observer = ref(null);
const sentinel = ref(null);

onMounted(async () => {
  if (games.value.length > 0 && popularGames.value.length > 0) return;
  loading.value = true;
  try {
    await Promise.all([fetchGames(1, false), fetchPopularGames()]);
  } catch (err) {
    error.value = err.message || "Error to fetch games";
    console.error("onMounted error:", err);
  } finally {
    loading.value = false;
  }

  await nextTick();

  observer.value = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        hasMoreGames.value &&
        !loadingMore.value
      ) {
        loadMoreGames();
      }
    },
    { threshold: 0.1 }
  );

  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

const loadMoreGames = async () => {
  if (!hasMoreGames.value || loadingMore.value) return;
  loadingMore.value = true;
  try {
    await fetchGames(currentPage.value + 1, true);
  } catch (err) {
    error.value = err.message || "Error loading more games";
    console.error("loadMoreGames error:", err);
  } finally {
    loadingMore.value = false;
  }
};
</script>

<template>
  <main class="container mx-auto p-4">
    <h1
      class="text-light-text-color mt-32 text-4xl max-w-[500px] md:text-5xl lg:text-6xl lg:max-w-[630px] font-bold uppercase"
    >
      find all the games in one place
    </h1>

    <!-- Loading skeleton -->
    <div v-if="loading" class="w-full">
      <PopularSkeleton />
      <div class="mt-20 w-full">
        <GameCardSkeleton />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else>
      <PopularGames :games="popularGames" :loading="loading" :error="error" />
      <SearchBar />
      <h2 class="text-2xl font-bold mb-4 mt-8">All Videogames</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GameCard
          v-for="game in games"
          :key="game.id"
          :game="game"
          :is-in-top-five="isInTopFive(game.id)"
        />
      </div>
      <!-- Loading skeleton for more games -->
      <div v-if="loadingMore">
        <GameCardSkeleton />
      </div>

      <div v-if="hasMoreGames" ref="sentinel" class="h-10"></div>

      <div
        v-if="!hasMoreGames && games.length > 0"
        class="text-center mt-4 text-gray-500"
      >
        No more games to load.
      </div>
    </div>
  </main>
</template>
