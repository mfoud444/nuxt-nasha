<script setup lang="ts">
const { wooNuxtVersionInfo } = useHelpers();

</script>
<template>
  <footer class="bg-grad order-last mt-2 myglass bottom-0 z-40">
    <div class="container flex flex-wrap justify-between gap-12 my-12 md:gap-24">
      <div class="mr-auto">
        <Logo />
        <WebsiteShortDescription />
        <LangSwitcher class="mt-14" />
      </div>
      <!-- <div class="w-3/7 lg:w-auto">
        <div class="mb-2 font-semibold underline--magical">{{ $t('messages.general.information') }}</div>
        <div class="text-sm">
          <a class="py-1.5 block" href="https://github.com/scottyzen/woonuxt?tab=readme-ov-file#next-generation-front-end-for-woocommerce" target="_blank">{{ $t('messages.general.about') }}</a>
          <a href="/" class="py-1.5 block">{{ $t('messages.general.careers') }}</a>
          <a href="/" class="py-1.5 block">{{ $t('messages.general.press') }}</a>
          <a href="https://woonuxt.com/faq" class="py-1.5 block" rel="noreferrer" target="_blank">{{ $t('messages.general.faq') }}</a>
        </div>
      </div> -->
      <div class="w-3/7 lg:w-auto">
        <span class="mb-2 font-semibold text-xl underline--magical">{{ $t('messages.shop.products') }}</span>
        <div class="text-sm">
          <NuxtLink to="/products" class="py-1.5 block">{{ $t('messages.shop.newArrivals') }}</NuxtLink>
          <NuxtLink to="/products?filter=sale[true]" class="py-1.5 block">{{ $t('messages.shop.onSale') }}</NuxtLink>
          <NuxtLink to="/products?orderby=rating&order=ASC&filter=rating[1]" class="py-1.5 block">{{ $t('messages.shop.topRated') }}</NuxtLink>
        </div>
      </div>

      <!-- <div class="w-3/7 lg:w-auto">
        <span class="mb-2 font-semibold text-xl underline--magical">{{ $t('messages.general.customerService') }}</span>
        <div class="text-sm">
          <NuxtLink to="/contact" class="py-1.5 block">{{ $t('messages.general.contact') }}</NuxtLink>
          <a href="/" class="py-1.5 block">{{ $t('messages.general.shippingReturns') }}</a>
          <a href="/" class="py-1.5 block">{{ $t('messages.general.privacyPolicy') }}</a>
          <a href="/" class="py-1.5 block">{{ $t('messages.general.termsConditions') }}</a>
        </div>
      </div>  -->

      <div class="w-3/7 lg:w-auto">
        <span class="mb-2 font-semibold text-xl underline--magical">{{ $t('messages.account.myAccount') }}</span>
        <div class="text-sm">
          <NuxtLink to="/my-account/" class="py-1.5 block">{{ $t('messages.account.myAccount') }}</NuxtLink>
          <NuxtLink to="/my-account/?tab=orders" class="py-1.5 block">{{ $t('messages.shop.orderHistory') }}</NuxtLink>
          <NuxtLink to="/wishlist" class="py-1.5 block">{{ $t('messages.shop.wishlist') }}</NuxtLink>
        </div>
      </div>
    </div>

    <div class="container flex items-center justify-center mb-4">
      <div class="copywrite">
        <p class="py-4 text-xs text-center">
          Copyright © {{ new Date().getFullYear() }} - 
          <a href="#" :title="`Nasha v${wooNuxtVersionInfo}`"></a> by
          <a href="https://nasha-store.com" title="Nasha Store" target="_blank" rel="noopener noreferrer">Nasha Store</a>
        </p>
      </div>
      <SocialIcons class="ml-auto" />
    </div>
  </footer>
</template>


<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
