<template>
  <nav>
    <ion-router-link to="/">{{ $t('messages.general.home') }}</ion-router-link>
    <ion-router-link to="/products">{{ $t('messages.general.allProducts') }}</ion-router-link>
    <ion-router-link to="/categories">{{ $t('messages.shop.category', 2) }}</ion-router-link>
    <ion-router-link to="/contact">{{ $t('messages.general.contact') }}</ion-router-link>
    <ion-router-link class="lg:hidden" to="/wishlist" :prefetch="false">Wishlist</ion-router-link>
    <ion-router-link class="lg:hidden" to="/my-account" :prefetch="false">My Account</ion-router-link>
  </nav>
</template>
