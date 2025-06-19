<!--
  Componente ThemeToggle
  - Permite alternar entre el modo claro y oscuro de la aplicación.
  - Props: Ninguna.
  - Dependencias: Requiere el composable useTheme para gestionar el estado del tema.
-->
<script setup>
import { useTheme } from "../lib/composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative flex items-center w-16 h-8 p-1 rounded-full bg-card text-text transition-all duration-300 ease-in-out cursor-pointer border border-gray-800"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    role="switch"
    :aria-checked="isDark"
  >
    <div
      class="absolute w-6 h-6 rounded-full bg-light-text-color shadow-lg transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-8': isDark }"
    ></div>
    <svg
      v-if="isDark"
      class="w-5 h-5 ml-1 text-primary transition-opacity duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <svg
      v-else
      class="w-5 h-5 ml-9 text-black transition-opacity duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>
