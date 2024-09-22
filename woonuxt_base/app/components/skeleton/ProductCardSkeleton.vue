<script lang="ts" setup>
const props = defineProps({
  animated: { type: Boolean, default: true },
});
</script>

<template>
     
  <div class="product-card w-full max-w-xs p-2 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white shadow-md">
    <n-skeleton :width="'100%'" :height="'150px'" animated />
    <div class="w-full mt-4 p-2">
      <n-skeleton :width="'80%'" :height="'20px'" animated />
      <n-skeleton :width="'60%'" :height="'15px'" class="mt-2" animated />
      <n-skeleton :width="'50%'" :height="'20px'" class="mt-2" animated />
    </div>
  
</div>
</template>
