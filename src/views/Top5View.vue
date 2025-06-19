<!--
  Componente TopFiveView
  - Muestra una lista de los juegos favoritos del usuario en una cuadrícula.
  - Props: Ninguna.
  - Dependencias:
    - Pinia para useTopFiveStore.
    - Componente GameCard para renderizar cada juego.
-->
<script setup>
import GameCard from "../components/GameCard.vue";
import { useTopFiveStore } from "../lib/stores/topFiveStore";

// TopFive store
const { topFiveGames } = useTopFiveStore();
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="py-26 text-light-text-color">Your Top 5 Games</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GameCard v-for="game in topFiveGames" :key="game.id" :game="game" />
    </div>
  </main>
</template>
