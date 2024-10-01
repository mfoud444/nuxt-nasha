<script setup lang="ts">
const { theList } = useWishlist();
const { storeSettings } = useAppConfig();

const isNative = storeSettings.isNative;

</script>

<template>
  <div class=" rounded-lg  min-h-[400px] w-full p-4 md:p-12 justify-center items-start">
    <div class="container">
      <div class="flex justify-between items-center mb-4">
        <div  v-if="isNative"></div>
        <h1 v-if="!isNative" class="text-xl font-semibold">{{ $t('messages.shop.wishlist') }}</h1>
        <NBadge
    :value="theList.length"
    type="info"
  />

        <!-- <span class="text-gray-400">Items: {{ theList.length }}</span> -->
      </div>
      <client-only>
        <ul v-if="theList.length" class="grid divide-y divide-gray-100">
          <WishListItem v-for="product in theList" :key="product.databaseId" :product="product" />
        </ul>
        <div v-else class="flex text-center min-h-[600px] text-gray-500 items-center justify-center">
          <SvgIcon icon=""/>
          <p>{{ $t('messages.shop.wishlistNoItems') }}</p>

        </div>
      </client-only>
    </div>
  </div>
</template>
