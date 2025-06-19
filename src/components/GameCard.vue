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
    class="relative block bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-102 transition duration-300 ease-in-out"
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
      />
    </div>

    <div class="py-4 px-6">
      <h2 class="mt-2 text-lg text-light-text-color font-semibold">
        {{ game.name }}
      </h2>
      <p v-if="game.genres" class="text-sm text-dark-text-color">
        {{ game.genres.map((g) => g.name).join(", ") }}
      </p>
      <div class="flex justify-between items-center mt-2">
        <p
          v-if="game.rating"
          class="text-sm text-white bg-primary px-2 mt-4 rounded"
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
