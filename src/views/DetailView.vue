<script setup>
import { onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "../lib/stores/gameStore";
import { useRoute } from "vue-router";
import { useTopFiveStore } from "../lib/stores/topFiveStore";
import TopFiveButton from "../components/buttons/TopFiveButton.vue";
import DetailSkeleton from "../components/skeletons/DetailSkeleton.vue";

const route = useRoute();

// Game store
const gameStore = useGameStore();
const { currentGame, loading, error } = storeToRefs(gameStore);
const { fetchGameById } = gameStore;

// TopFive store
const topFiveStore = useTopFiveStore();
const { topFiveError } = storeToRefs(topFiveStore);
const { addTopFiveGames, removeTopFiveGames, isInTopFive, clearError } =
  topFiveStore;

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

  clearError();
});
</script>

<template>
  <main class="w-full py-16">
    <!-- Loading -->
    <div v-if="loading" class="w-full">
      <DetailSkeleton />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else-if="currentGame" class="">
      <!-- Hero -->
      <section
        :style="{ backgroundImage: `url(${currentGame.background_image})` }"
        class="w-full h-screen bg-cover bg-center relative overflow-hidden flex flex-col items-center justify-center gap-4"
      >
        <div
          class="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-mask1 to-mask2"
        ></div>
        <div
          class="absolute w-full h-full bottom-0 left-0 bg-gradient-to-t from-background to-transparent"
        ></div>
        <div class="absolute z-10 top-0 left-0 w-full h-full">
          <!-- Hero wrapper -->
          <div
            class="container mx-auto p-4 flex flex-col items-center gap-8 md:items-start"
          >
            <h1
              class="uppercase text-4xl font-bold text-light-text-color mt-32 md:text-5xl lg:text-[72px] lg:max-w-[600px]"
            >
              {{ currentGame.name }}
            </h1>
            <p class="text-light-text-color max-w-[400px]">
              {{
                currentGame.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")
              }}
            </p>
            <!-- Top 5 Button -->
            <TopFiveButton
              :game="currentGame"
              :is-in-top-five="isInTopFive"
              :add-to-top-five="addTopFiveGames"
              :remove-from-top-five="removeTopFiveGames"
              :error="topFiveError"
              :clear-error="clearError"
            />
          </div>
        </div>
      </section>

      <div class="container mx-auto p-4 transform -translate-y-[100px]">
        <!-- About Game -->
        <section class="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <article
            class="bg-card w-full lg:flex-1 rounded-xl shadow-2xl p-12 flex flex-col items-start justify-center"
          >
            <h2
              class="text-light-text-color text-2xl uppercase font-bold lg:text-3xl"
            >
              About this videogame
            </h2>
            <span class="text-dark-text-color mt-4">{{
              currentGame.genres.map((genre) => genre.name).join(", ")
            }}</span>
            <p
              v-if="currentGame.description_raw"
              class="mt-4 text-light-text-color max-w-2xl"
            >
              {{ currentGame.description_raw.substring(0, 460) + "..." }}
            </p>
          </article>
          <article
            class="bg-card py-12 text-[112px] font-bold flex items-center justify-center rounded-xl shadow-2xl text-primary w-full h-full lg:w-[377px] lg:h-[377px] lg:py-0"
          >
            <p>{{ currentGame.rating }}</p>
          </article>
        </section>

        <!-- Galery -->
        <section class="mt-4">
          <div
            class="w-full h-full max-h-[800px] overflow-hidden rounded-2xl shadow-2xl"
          >
            <video
              v-if="currentGame.clip"
              :src="currentGame.clip"
              controls
              autoplay
            ></video>
            <img
              v-else-if="currentGame.background_image"
              :src="currentGame.background_image"
              :alt="currentGame.name"
              class="w-full h-full object-cover"
              draggable="false"
              loading="lazy"
            />
          </div>
          <div
            class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="(image, index) in currentGame.screenshots"
              :key="index"
              class="w-full h-full overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                :src="image.image"
                :alt="currentGame.name + index"
                class="w-full h-full object-cover"
                draggable="false"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </div>

    <div v-else class="text-text text-center">Game not found.</div>
  </main>
</template>
