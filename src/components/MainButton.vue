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
  notAllowed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <RouterLink
    :to="to"
    :class="[
      'px-4 py-2 rounded-lg text-text transition-colors duration-200',
      primary && !secondary ? 'bg-primary text-white' : '',
      secondary ? 'bg-secondary text-black' : '',
      notAllowed && 'cursor-not-allowed',
    ]"
  >
    <slot></slot>
  </RouterLink>
</template>
