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
