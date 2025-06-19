<!--
  Componente TopFiveButton
  - Permite añadir o quitar un juego de la lista de Top 5.
  - Props:
    - game: Object (juego a gestionar, requerido)
    - isInTopFive: Function (verifica si el juego está en Top 5, requerido)
    - addToTopFive: Function (añade el juego a Top 5, requerido)
    - removeFromTopFive: Function (elimina el juego de Top 5, requerido)
    - error: String (mensaje de error, por defecto null)
  - Dependencias: Requiere Pinia para interactuar con el store de Top 5.
-->
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
      class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-darker transition-colors duration-300 cursor-pointer"
    >
      Add to Top 5
    </button>
    <button
      v-else
      @click="removeFromTopFive(game)"
      class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-darker transition-colors duration-300"
    >
      Remove from Top 5
    </button>
    <p v-if="error" class="mt-2 text-red-500">{{ error }}</p>
  </div>
</template>
