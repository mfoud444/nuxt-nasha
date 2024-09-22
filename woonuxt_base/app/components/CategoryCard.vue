<script setup lang="ts">
const { fallbackImage } = useHelpers();
const props = defineProps({
  node: { type: Object, required: true },
  imageLoading: { type: String as PropType<'lazy' | 'eager'>, default: 'lazy' },
});

const imgWidth = 220;
const imgHeight = Math.round(imgWidth * 1.125);
</script>

<template>
  <NuxtLink
    v-if="node"
    :to="`/product-category/${decodeURIComponent(node.slug)}`"
>
<div class="flex flex-col gap-2 justify-center items-center">
  <NuxtImg
      width="60px"
      height="60px"
      class="rounded-full"
      :src="node.image?.sourceUrl || fallbackImage"
      :alt="node.image?.altText || node.name"
      :title="node.image?.title || node.name"
      :loading="imageLoading"
      :sizes="`${imgWidth / 2}px md:${imgWidth}px`"
      placeholder
      placeholder-class="blur-xl" />
      <span class="relative z-10 mt-auto mb-2 text-sm font-semibold  capitalize md:text-base md:mb-4" v-html="node.name" />
  </div>
</NuxtLink>
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 4 / 5;
}
</style>
