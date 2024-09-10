<script setup lang="ts">
const { siteName } = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
const faviconUrl = '/icon-only.png';
</script>

<template>
  <NuxtLink to="/">
    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="object-contain rounded h-10" />
    <div v-else class="flex items-center  gap-2 text-lg font-bold">
      <img class="rounded" :src="faviconUrl" alt="Logo" width="32" height="32" />
      <span class="gtext md:text-xl">{{ siteName }}</span>
    </div>
  </NuxtLink>
</template>
