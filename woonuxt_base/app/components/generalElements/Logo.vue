<script setup lang="ts">
const { siteName } = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const img = useImage();
const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
const faviconUrl = '/icon-only.png';
const { storeSettings } = useAppConfig();

const isNative = storeSettings.isNative;
</script>

<template>
  <component class=" cursor-pointer" :is="!isNative ? 'div' : 'NuxtLink'" v-bind="isNative && { to: '/' }">
    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="object-contain rounded h-10" />
    <div v-else class="flex items-center gap-2 text-lg font-bold">
      <img v-if="isNative" class=" rounded-full" :src="faviconUrl" alt="Logo" width="38" height="42" />
      <span class="gtext md:text-xl">{{ siteName }}</span>
    </div>
  </component>
</template>
