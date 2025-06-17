<script setup>
/**
 * Componente para mostrar una card de videojuego
 *
 * @param {Object} game
 *
 */
import { defineProps } from "vue";

defineProps({
  game: {
    type: Object,
    required: true,
    validator: (game) => {
      return "id" in game && "name" in game && "background_image" in game;
    },
  },
});
</script>

<template>
  <router-link
    :to="{ name: 'detail', params: { id: game.id } }"
    class="block bg-white rounded-xl shadow hover:shadow-md transition"
  >
    <div class="relative overflow-hidden">
      <img
        :src="game.background_image"
        :alt="game.name"
        class="w-full h-48 object-cover rounded"
      />
    </div>
    <div class="p-4">
      <h2 class="mt-2 text-lg font-semibold">{{ game.name }}</h2>
    </div>
  </router-link>
</template>

// { // "id": 3498, // "slug": "grand-theft-auto-v", // "name": "Grand Theft
Auto V", // "released": "2013-09-17", // "tba": false, // "background_image":
"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg", //
"rating": 4.47, // "rating_top": 5, // "ratings": [ // { // "id": 5, // "title":
"exceptional", // "count": 4272, // "percent": 59.02 // }, // { // "id": 4, //
"title": "recommended", // "count": 2366, // "percent": 32.69 // }, // { //
"id": 3, // "title": "meh", // "count": 460, // "percent": 6.36 // }, // { //
"id": 1, // "title": "skip", // "count": 140, // "percent": 1.93 // } // ], //
"ratings_count": 7123, // "reviews_text_count": 66, // "added": 22074, //
"added_by_status": { // "yet": 556, // "owned": 12718, // "beaten": 6261, //
"toplay": 629, // "dropped": 1158, // "playing": 752 // }, // "metacritic": 92,
// "playtime": 74, // "suggestions_count": 441, // "updated":
"2025-06-16T20:33:58", // "user_game": null, // "reviews_count": 7238, //
"parent_platforms": [ // { // "platform": { // "id": 1, // "name": "PC", //
"slug": "pc" // } // }, // { // "platform": { // "id": 2, // "name":
"PlayStation", // "slug": "playstation" // } // }, // { // "platform": { //
"id": 3, // "name": "Xbox", // "slug": "xbox" // } // } // ], // "genres": [ //
{ // "id": 4, // "name": "Action", // "slug": "action", // "games_count":
187781, // "image_background":
"https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg" //
} // ], // "short_screenshots": [ // { // "id": -1, // "image":
"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg" //
}, // { // "id": 1827221, // "image":
"https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg"
// }, // { // "id": 1827222, // "image":
"https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg"
// }, // { // "id": 1827223, // "image":
"https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg"
// }, // { // "id": 1827225, // "image":
"https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg"
// }, // { // "id": 1827226, // "image":
"https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg"
// }, // { // "id": 1827227, // "image":
"https://media.rawg.io/media/screenshots/592/592e2501d8734b802b2a34fee2df59fa.jpg"
// } // ] // }
