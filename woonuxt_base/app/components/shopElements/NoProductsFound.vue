<script setup lang="ts">
const { allProducts } = useProducts();
const { clearSearchQuery, isSearchActive } = useSearching();
const { resetFilter, isFiltersActive } = useFiltering();

const clearAll = () => {
  if (isFiltersActive.value) resetFilter();
  if (isSearchActive.value) clearSearchQuery();
};
</script>

<template>
  <div class="w-full my-16 lg:my-24">
    <div class="flex flex-col items-center justify-center w-full text-center text-pretty">
      <Icon name="ion:sad-outline" size="156" class="opacity-25 mb-10" />
      <h2 class="text-2xl font-bold">{{ $t('messages.general.noProductsFounded') }}</h2>
      <p class="mt-4 max-w-md">
        <slot>{{ $t('messages.general.tryAdjustingSearch') }}</slot>
      </p>
      <div>
        <button
          v-if="allProducts.length"
          class="bg-primary rounded-lg font-bold mt-8 text-center text-white text-sm w-full p-2 px-3 inline-block hover:bg-primary-dark"
          title="{{ $t('messages.general.clearAllFilters') }}"
          aria-label="{{ $t('messages.general.clearAllFilters') }}"
          @click="clearAll">
          {{ $t('messages.general.clearAllFilters') }}
        </button>
      </div>
    </div>
  </div>
</template>
