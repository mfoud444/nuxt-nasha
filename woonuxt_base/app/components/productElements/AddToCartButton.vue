<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
  onlyIcon: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : t('messages.shop.addToCart')));

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <button
    type="submit"
    class="rounded-lg flex font-bold bg-gray-800 text-white text-center  p-1 gap-4 items-center justify-center px-4 focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true">

    <span v-if="!onlyIcon">{{ addToCartButtonText }}</span>
    <SvgIcon v-if="onlyIcon && !isLoading" icon="material-symbols:add-shopping-cart-rounded"   class="text-xl text-white dark:text-black"/>
    <div v-if="isLoading" class="p-1">
      <LoadingIcon  stroke="4" size="12" color="#fff" />
    </div>
    
  </button>
</template>

<style lang="postcss" scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  @apply cursor-not-allowed bg-gray-400;
}
</style>
