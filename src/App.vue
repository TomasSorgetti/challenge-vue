<script setup>
import Navbar from "./layouts/Navbar.vue";
import Footer from "./layouts/Footer.vue";
</script>

<template>
  <div class="bg-background text-text min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- SPA Content -->
    <router-view />

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>
