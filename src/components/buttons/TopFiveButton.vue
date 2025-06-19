<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
  isInTopFive: {
    type: Function,
    required: true,
  },
  addToTopFive: {
    type: Function,
    required: true,
  },
  removeFromTopFive: {
    type: Function,
    required: true,
  },
  error: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div>
    <button
      v-if="!isInTopFive(game.id)"
      @click="addToTopFive(game)"
      class="bg-light-text-color text-secondary font-bold px-16 py-4 rounded transition-colors duration-300 cursor-pointer"
    >
      Add to Top 5
    </button>
    <button
      v-else
      @click="removeFromTopFive(game)"
      class="bg-light-text-color text-secondary font-bold px-16 py-4 rounded transition-colors duration-300 cursor-pointer"
    >
      Remove from Top 5
    </button>
    <p v-if="error" class="mt-2 text-red-500">{{ error }}</p>
  </div>
</template>
