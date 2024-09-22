<script setup lang="ts">
const { product } = defineProps({
  product: { type: Object as PropType<Product>, required: true },
});
const { storeSettings } = useAppConfig();

const initialTab = product.description ? 0 : 1;
const show = ref(initialTab);
</script>

<template>
    <NTabs
     type="segment"
  
      animated>
      <NTabPane v-if="product.description" name="description" :tab="$t('messages.shop.productDescription')">
      <div v-html="product.description" class="font-light mt-8 prose" />
    </NTabPane>

   
    <NTabPane v-if="storeSettings.showReviews" name="reviews" :tab="`${$t('messages.shop.reviews')} (${product.reviewCount})`">
      <ProductReviews :product="product" />
    </NTabPane>
</NTabs>
  <!-- <div>
    <nav class="border-b flex gap-4 tabs">
      <button v-if="product.description" type="button" :class="show === 0 ? 'active' : ''" @click.prevent="show = 0">{{ $t('messages.shop.productDescription') }}</button>
      <button v-if="storeSettings.showReviews" type="button" :class="show === 1 ? 'active' : ''" @click.prevent="show = 1">{{ $t('messages.shop.reviews') }} ({{ product.reviewCount }})</button>
    </nav>
    <div class="tab-contents">
      <div v-if="show === 0 && product.description" class="font-light mt-8 prose" v-html="product.description" />
      <ProductReviews v-if="show === 1" :product="product" />
    </div>
  </div> -->
</template>

<style lang="postcss" scoped>
.tabs button {
  @apply border-transparent border-b-2 text-lg pb-4;
  margin-bottom: -1px;
}

.tabs button.active {
  @apply border-primary text-primary;
}
</style>
