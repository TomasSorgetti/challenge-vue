<script setup>
/**
 * Componente para mostrar los juegos más populares
 *
 * @param {}
 *
 */
import { defineProps } from "vue";

defineProps({
  games: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">Juegos Populares</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="game in games" :key="game.id">
      <h3>{{ game.name }}</h3>
    </div>
  </div>
</template>
