<script setup>
import { useGameStore } from "../lib/stores/gameStore";

const { loading } = useGameStore();

</script>

<template>
  <div
    v-if="loading"
    class="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 block"
  >
    <div
      class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
    ></div>
  </div>
</template>

<style>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
