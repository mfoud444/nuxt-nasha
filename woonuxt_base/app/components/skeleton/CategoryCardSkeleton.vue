<script lang="ts" setup>
const props = defineProps({
  text: { type: Boolean, default: false },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <n-skeleton circle width="80px" height="80px" animated />
    <n-skeleton :width="'60%'" :height="'20px'" class="mt-4" animated />
  </div>
</template>
