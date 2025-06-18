<script setup>
import MainButton from "./MainButton.vue";
import { defineProps, ref, watch, onMounted, onUnmounted } from "vue";

const activeGame = ref(null);
const isPaused = ref(false);
const rotationInterval = ref(null);

const { games, loading, error } = defineProps({
  games: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});

watch(
  () => games,
  (newGames) => {
    if (!loading && newGames?.length > 0 && !activeGame.value) {
      activeGame.value = newGames[0];
    }
  },
  { immediate: true }
);

const rotateGame = () => {
  if (!games.length || loading || error) return;
  const currentIndex = games.findIndex(
    (game) => game.id === activeGame.value?.id
  );
  const nextIndex = (currentIndex + 1) % games.length;
  activeGame.value = games[nextIndex];
};

const startRotation = () => {
  if (rotationInterval.value) clearInterval(rotationInterval.value);
  rotationInterval.value = setInterval(() => {
    if (!isPaused.value) rotateGame();
  }, 5000);
};

const stopRotation = () => {
  if (rotationInterval.value) {
    clearInterval(rotationInterval.value);
    rotationInterval.value = null;
  }
};

const setActiveGame = (game) => {
  activeGame.value = game;
  isPaused.value = true;
  setTimeout(() => {
    isPaused.value = false;
  }, 10000);
};

onMounted(() => {
  if (games.length > 0) startRotation();
});

watch(
  () => games.length,
  (newLength) => {
    if (!loading && newLength > 0) {
      startRotation();
    } else {
      stopRotation();
    }
  }
);

onUnmounted(() => {
  stopRotation();
});
</script>

<template>
  <section class="w-full flex justify-between mt-20 gap-8">
    <!-- Active game -->
    <div
      class="shadow-2xl rounded-3xl w-full relative overflow-hidden max-h-[545px]"
    >
      <div class="absolute top-0 left-0 mask h-full w-full block"></div>
      <transition name="fade">
        <img
          v-if="activeGame && activeGame.background_image"
          :key="activeGame.id"
          :src="activeGame.background_image"
          :alt="activeGame.name"
          class="w-full h-full object-cover"
        />
      </transition>
      <div
        v-if="activeGame"
        class="flex flex-col items-start absolute p-12 bottom-0 left-0 gap-4 text-white"
      >
        <h2 class="text-6xl font-bold uppercase max-w-[500px]">
          {{ activeGame.name }}
        </h2>
        <p class="max-w-[500px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos quod
          minima facere, quas praesentium ratione hic fugit sint mollitia
          doloremque repudiandae esse eius vel beatae iusto eaque! Minus, iste
          dicta?
        </p>
        <MainButton secondary notAllowed> Add Top 5 </MainButton>
      </div>
    </div>

    <!-- Lista de juegos populares -->
    <ul class="flex flex-col items-start justify-start gap-2">
      <li v-for="game in games" :key="game.id" class="w-full min-w-[200px]">
        <button
          @click="setActiveGame(game)"
          :class="[
            'flex items-center gap-2 p-4 w-full rounded-2xl transition-colors duration-300',
            activeGame?.id === game.id
              ? 'bg-primary cursor-not-allowed text-white'
              : 'bg-transparent cursor-pointer text-light-text-color',
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
          <h3 class="max-w-[140px] text-[16px] text-left">{{ game.name }}</h3>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.mask {
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 60%
  );
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
