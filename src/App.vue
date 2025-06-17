<script setup>
import { useTheme } from "./composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="min-h-screen bg-background text-text">
    <header class="bg-primary p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Mi Aplicación</h1>
        <button
          @click="toggleTheme"
          class="bg-white text-text px-4 py-2 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
        >
          {{ isDark ? "Modo Claro" : "Modo Oscuro" }}
        </button>
      </div>
    </header>
    <main class="container mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>
