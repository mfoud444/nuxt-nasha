<template>
  <nav class="text-black">
    <NuxtLink to="/">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink to="/products">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <NuxtLink to="/categories">{{ $t('messages.shop.category', 2) }}</NuxtLink>
    <!-- <NuxtLink to="/contact">{{ $t('messages.general.contact') }}</NuxtLink> -->
    <NuxtLink class="lg:hidden" to="/wishlist" :prefetch="false">{{ $t('messages.shop.wishlist') }}</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false">{{ $t('messages.account.myAccount') }}</NuxtLink>
  </nav>
</template>
