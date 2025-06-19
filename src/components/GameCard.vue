<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  game: {
    type: Object,
    required: true,
    validator: (game) => {
      return "id" in game && "name" in game && "background_image" in game;
    },
  },
  isInTopFive: {
    type: Boolean,
    default: false,
  },
});

const currentImageIndex = ref(0);
const images = computed(() => {
  const screenshots = Array.isArray(props.game.short_screenshots)
    ? props.game.short_screenshots.map((s) => s.image).slice(0, 4)
    : [];
  return [props.game.background_image, ...screenshots].filter(Boolean);
});

let rotationInterval = null;

const startImageRotation = () => {
  if (images.value.length <= 1) return;
  clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % images.value.length;
  }, 800);
};

const stopImageRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
  currentImageIndex.value = 0;
};

images.value.forEach((src) => {
  const img = new Image();
  img.src = src;
});
</script>

<template>
  <router-link
    :to="{ name: 'detail', params: { id: game.id } }"
    class="relative block bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-102 transition duration-300 ease-in-out h-full lg:min-h-[360px]"
    @mouseenter="startImageRotation()"
    @mouseleave="stopImageRotation()"
  >
    <span
      v-if="isInTopFive"
      class="absolute top-0 right-0 rounded-tr-xl z-10 px-4 py-2 text-xs text-white bg-primary text-center"
    >
      top 5
    </span>

    <div class="relative overflow-hidden">
      <img
        :src="
          images[currentImageIndex] ||
          game.background_image ||
          '/placeholder.jpg'
        "
        :alt="game.name"
        class="w-full h-48 object-cover rounded-t-xl"
        draggable="false"
        loading="lazy"
      />
    </div>

    <div
      class="py-4 px-6 gap-2 flex flex-col items-start justify-between min-h-[calc(100%-12rem)]"
    >
      <!-- Card info -->
      <div>
        <h2 class="text-2xl text-light-text-color font-bold uppercase">
          {{ game.name }}
        </h2>
        <p v-if="game.genres" class="text-sm text-dark-text-color">
          {{ game.genres.map((g) => g.name).join(", ") }}
        </p>
      </div>

      <!-- Card footer -->
      <div class="w-full flex justify-between items-center mt-4">
        <p
          v-if="game.rating"
          class="text-sm text-card-accent font-bold bg-primary-bis border border-primary px-2 rounded"
        >
          {{ game.rating }}
        </p>
        <p v-if="game.released" class="text-sm text-dark-text-color">
          {{ game.released }}
        </p>
      </div>
    </div>
  </router-link>
</template>
