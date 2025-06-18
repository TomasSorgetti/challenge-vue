<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { searchGames } from "../lib/services/games";
import { debounce } from "lodash-es";

const query = ref("");
const searchResults = ref([]);
const isLoading = ref(false);
const error = ref(null);
const showDropdown = ref(false);
const router = useRouter();

const debouncedSearch = debounce(async (searchQuery) => {
  if (!searchQuery.trim()) {
    searchResults.value = [];
    error.value = null;
    showDropdown.value = false;
    return;
  }

  isLoading.value = true;
  try {
    const results = await searchGames(searchQuery.trim());
    searchResults.value = results;
    error.value = null;
    showDropdown.value = results.length > 0;
  } catch (err) {
    error.value = err.message || "Error al buscar juegos";
    searchResults.value = [];
    showDropdown.value = true;
  } finally {
    isLoading.value = false;
  }
}, 300);

watch(query, (newQuery) => {
  debouncedSearch(newQuery);
});

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const selectGame = (game) => {
  if (!game || !game.id) {
    console.error("Invalid game selected:", game);
    return;
  }
  query.value = "";
  searchResults.value = [];
  showDropdown.value = false;
  router.push(`/videogames/${game.id}`);
};

const dropdownClasses = computed(() => ({
  "absolute top-16 z-10 w-full min-h-[300px] bg-white rounded-3xl shadow-2xl overflow-hidden": true,
  hidden: !showDropdown.value,
}));
</script>

<template>
  <div class="relative mt-20 w-full max-w-[323px]">
    <!-- Search -->
    <div class="relative">
      <input
        v-model.trim="query"
        type="text"
        placeholder="Search videogame..."
        class="w-full border border-primary rounded-full px-6 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary"
        @focus="showDropdown = query || searchResults.length > 0"
        @blur="handleBlur"
      />
      <div
        class="absolute top-1/2 transform -translate-y-1/2 right-4 h-6 w-6 bg-[url('/search.svg')]"
      ></div>
    </div>

    <!-- Menu -->
    <ul :class="dropdownClasses" role="menu">
      <li v-if="isLoading" class="p-4 text-center text-gray-500">
        Searching...
      </li>
      <li v-else-if="error" class="p-4 text-center text-red-500">
        {{ error }}
      </li>
      <li
        v-else-if="query && !searchResults.length"
        class="p-4 text-center text-gray-500"
      >
        Didn't find any videogame.
      </li>
      <li
        v-for="game in searchResults"
        :key="game.id"
        class="p-4 flex items-center gap-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        @mousedown.prevent="selectGame(game)"
      >
        <img
          v-if="game.background_image"
          :src="game.background_image"
          :alt="game.name"
          class="w-12 h-12 object-cover rounded"
        />
        <span class="text-text truncate">{{ game.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul[role="menu"] li {
  user-select: none;
}
</style>
