<script setup>
import { useTheme } from "../lib/composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <nav class="bg-primary p-4 shadow">
    <button
      @click="toggleTheme"
      class="bg-background text-text px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {{ isDark ? "Claro" : "Oscuro" }}
    </button>
  </nav>
</template>
