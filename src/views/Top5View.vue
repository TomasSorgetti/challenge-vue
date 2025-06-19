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
import draggable from "vuedraggable";

const topFiveStore = useTopFiveStore();

const onDragEnd = (event) => {
  topFiveStore.updateTopFiveOrder(topFiveStore.topFiveGames);
};
</script>

<template>
  <main class="container mx-auto p-4 text-center lg:text-left">
    <h1
      class="text-light-text-color mt-32 text-4xl md:text-5xl lg:text-6xl font-bold uppercase"
    >
      your top 5 videogames
    </h1>
    <p class="my-4 text-light-text-color max-w-[400px] mx-auto lg:mx-0">
      This is your top 5 best videogames! Drag and drop to change the order.
    </p>

    <draggable
      v-if="topFiveStore.topFiveGames.length > 0"
      v-model="topFiveStore.topFiveGames"
      item-key="id"
      @end="onDragEnd"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
    >
      <template #item="{ element: game }">
        <div class="cursor-grab active:cursor-grabbing h-full w-full">
          <GameCard :game="game" />
        </div>
      </template>
    </draggable>
    <div v-else class="text-light-text-color text-center my-32">
      <p>You don't have any videogame in your top 5 yet. Add some!</p>
    </div>
  </main>
</template>
