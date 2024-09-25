<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
}

const { regularPrice, salePrice } = defineProps<ProductPriceProps>();
</script>

<template>
  <div v-if="regularPrice" class="flex font-semibold  items-center">
    <span v-if="salePrice" class=" text-xl text-sky-500 font-bold" v-html="salePrice" />
    <span  :class="{ 'text-gray-400 line-through font-normal text-sm ml-2': salePrice }" v-html="regularPrice" />
    
  </div>
</template>
