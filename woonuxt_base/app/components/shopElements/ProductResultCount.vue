<script setup lang="ts">
const route = useRoute();
const { products } = useProducts();
const { productsPerPage } = useHelpers();
const page = ref(parseInt(route.params.pageNumber as string) || 1);
</script>

<template>
  <span class="text-sm font-light">
    <span>{{ $t('messages.general.showing') }} </span>
    <span v-if="products.length === 0" class="font-normal">{{ $t('messages.general.noProducts') }}</span>
    <template v-else>
      <span class="font-normal"> {{  (page - 1) * productsPerPage + 1 + ' '  }} </span>
      <span> {{ $t('messages.general.to') }} </span>
      <span class="font-normal">{{ ' ' + Math.min(page * productsPerPage, products.length) + ' ' }} </span>
      <span> {{ $t('messages.general.of') }} </span>
      <span class="font-normal"> {{ ' ' + products.length + '  ' }} </span>
    </template>
  </span>
</template>

