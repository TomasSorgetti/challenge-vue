<!--
  Componente Header
  - Muestra una barra de navegación fija con un logo, enlaces, botón de registro y alternador de tema.
  - Props: Ninguna.
  - Dependencias: 
    - vue-router para RouterLink.
    - Componentes MainButton y ThemeToggle.
-->
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import MainButton from "../components/buttons/MainButton.vue";
import ThemeToggle from "../components/ThemeToggle.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-background z-50 shadow-2xl">
    <nav
      class="p-4 container mx-auto flex justify-between items-center lg:py-6"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="z-50 text-3xl text-light-text-color font-bold uppercase"
      >
        Videogames
      </RouterLink>

      <!-- Hamburger button -->
      <button
        @click="toggleMenu"
        class="md:hidden flex flex-col items-center gap-1.5 z-50"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <div
          :class="[
            'w-6 h-0.5 bg-light-text-color transition-transform duration-300',
            isMenuOpen ? 'rotate-45 translate-y-2' : '',
          ]"
        ></div>
        <div
          :class="[
            'w-6 h-0.5 bg-light-text-color transition-opacity duration-300',
            isMenuOpen ? 'opacity-0' : '',
          ]"
        ></div>
        <div
          :class="[
            'w-6 h-0.5 bg-light-text-color transition-transform duration-300',
            isMenuOpen ? '-rotate-45 -translate-y-2' : '',
          ]"
        ></div>
      </button>

      <!-- Menu -->
      <ul
        id="mobile-menu"
        :class="[
          'bg-background flex flex-col items-center justify-center gap-8 lg:gap-4',
          'fixed top-0 left-0 w-full h-screen transition-transform duration-300',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          'md:static md:flex md:flex-row md:justify-end md:h-auto md:translate-x-0 md:gap-6',
        ]"
      >
        <li>
          <RouterLink
            to="/"
            class="text-light-text-color hover:text-primary"
            @click="closeMenu"
          >
            Videogames
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/top5"
            class="text-light-text-color hover:text-primary"
            @click="closeMenu"
          >
            Top 5
          </RouterLink>
        </li>
        <li>
          <MainButton to="/" @click="closeMenu" primary disabled
            >Sign Up</MainButton
          >
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  </header>
</template>
