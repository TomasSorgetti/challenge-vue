<!-- Componente que muestra un skeleton de popular -->
<template>
  <div class="w-full flex justify-between items-start mt-20 gap-8">
    <div
      class="w-full h-full min-h-[500px] bg-dark-skeleton animate-pulse rounded-3xl"
    ></div>
    <!-- Game -->
    <div class="hidden md:flex flex-col items-start justify-between gap-4">
      <div
        class="w-full min-w-[220px] min-h-[110px] rounded-2xl bg-dark-skeleton animate-pulse"
      ></div>
      <div
        class="w-full min-w-[220px] min-h-[110px] rounded-2xl bg-dark-skeleton animate-pulse"
      ></div>
      <div
        class="w-full min-w-[220px] min-h-[110px] rounded-2xl bg-dark-skeleton animate-pulse"
      ></div>
      <div
        class="w-full min-w-[220px] min-h-[110px] rounded-2xl bg-dark-skeleton animate-pulse"
      ></div>
    </div>
  </div>
</template>
