<!-- 
  Componente ButtonLink
  - Renderiza un enlace de navegación usando vue-router.
  - Props:
    - to: String (ruta a la que navega, por defecto "/")
    - primary: Boolean (aplica estilo primario, por defecto true)
    - secondary: Boolean (aplica estilo secundario, por defecto false)
    - disabled: Boolean (deshabilita el enlace, por defecto false)
  - Dependencias: Requiere vue-router para RouterLink.
-->
<script setup>
import { RouterLink } from "vue-router";
import { defineProps } from "vue";

defineProps({
  to: {
    type: String,
    default: "/",
  },
  primary: {
    type: Boolean,
    default: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <RouterLink
    :to="disabled ? '#' : to"
    :class="[
      'px-6 py-3 font-bold rounded-lg text-text transition-colors duration-200',
      primary && !secondary ? 'bg-primary text-white' : '',
      secondary ? 'bg-white text-black' : '',
      disabled && 'cursor-not-allowed',
    ]"
  >
    <slot></slot>
  </RouterLink>
</template>
