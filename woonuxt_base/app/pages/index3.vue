<script lang="ts" setup>

import { NIcon, type MenuOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
const router = useRouter();
const activeKey = ref<string>('shop');
const { currentPage,updateCurrentPage} = useHelpers();
function handleMenuItemClick(key: string) {
  updateCurrentPage(key)
 console.log(currentPage.value)
  activeKey.value = key;
}

function renderIcon(iconName: string) {
  return () => h(NIcon, null, { default: () => h(Icon, { icon: iconName, width: 46, height: 36 }) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h('div', { class: 'flex flex-col items-center' }, [
        renderIcon('ion:home')(), // Render the home icon
        h('span', { class: 'text-xs' }, 'Shop')
      ]),
    key: 'shop'
  },
  {
    label: () =>
      h('div', { class: 'flex flex-col items-center' }, [
        renderIcon('ion:search-outline')(), // Render the search icon
        h('span', { class: 'text-xs' }, 'Category')
      ]),
    key: 'category'
  },
  {
    label: () =>
      h('div', { class: 'flex flex-col items-center' }, [
        renderIcon('ion:cart-outline')(), // Render the cart icon
        h('span', { class: 'text-xs' }, 'Cart')
      ]),
    key: 'cart'
  },
  {
    label: () =>
      h('div', { class: 'flex flex-col items-center' }, [
        renderIcon('ion:person-outline')(), // Render the person icon
        h('span', { class: 'text-xs' }, 'Me')
      ]),
    key: 'me'
  }
];

// import home from '../pages/home.vue';
// import categories from '../pages/categories.vue';
// import cart from '../pages/cart.vue';
// import checkout from '../pages/checkout.vue';
// import contact from '../pages/contact.vue';
// import myAccount from '../pages/my-account.vue';
// import orderSummary from '../pages/order-summary.vue';
// import products from '../pages/products.vue';
// import resetPassword from '../pages/reset-password.vue';
// import settings from '../pages/settings.vue';
// import wishlist from '../pages/wishlist.vue';
// import product from '../pages/product/[slug].vue';
// import productCategory from '../pages/product-category/[slug].vue';

// // Dynamic component loading
// // Map of components
// const componentMap = {
//   'home': home,
//   'categories': categories,
//   'cart': cart,
//   'checkout': checkout,
//   'contact': contact,
//   'my-account': myAccount,
//   'order-summary': orderSummary,
//   'products': products,
//   'reset-password': resetPassword,
//   'settings': settings,
//   'wishlist': wishlist,
//   'product': product,
//   'product-category': productCategory,
// };
// Dynamic component loading

const currentSlug = ref<string | null>(null);
type ComponentKey = 'home' | 'categories' | 'cart' | 'checkout' | 'contact' | 'my-account' | 'order-summary' | 'products' | 'reset-password' | 'settings' | 'wishlist' | 'product' | 'product-category';
// const componentMap: Record<ComponentKey, Component> = {
//   'home': markRaw(defineAsyncComponent(() => import('../pages/home.vue'))),
//   'categories': markRaw(defineAsyncComponent(() => import('../pages/categories.vue'))),
//   'cart': markRaw(defineAsyncComponent(() => import('../pages/cart.vue'))),
//   'checkout': markRaw(defineAsyncComponent(() => import('../pages/checkout.vue'))),
//   'contact': markRaw(defineAsyncComponent(() => import('../pages/contact.vue'))),
//   'my-account': markRaw(defineAsyncComponent(() => import('../pages/my-account.vue'))),
//   'order-summary': markRaw(defineAsyncComponent(() => import('../pages/order-summary.vue'))),
//   'products': markRaw(defineAsyncComponent(() => import('../pages/products.vue'))),
//   'reset-password': markRaw(defineAsyncComponent(() => import('../pages/reset-password.vue'))),
//   'settings': markRaw(defineAsyncComponent(() => import('../pages/settings.vue'))),
//   'wishlist': markRaw(defineAsyncComponent(() => import('../pages/wishlist.vue'))),
//   'product': markRaw(defineAsyncComponent(() => import('../pages/product/[slug].vue'))),
//   'product-category': markRaw(defineAsyncComponent(() => import('../pages/product-category/[slug].vue'))),
// };


import home from './index.vue';
import categories from '../pages/categories.vue';
import cart from '../pages/cart.vue';
import checkout from './checkout1.vue';
import contact from '../pages/contact.vue';
import myAccount from '../pages/my-account.vue';
import orderSummary from '../pages/order-summary.vue';
import products from '../pages/products.vue';
import resetPassword from '../pages/reset-password.vue';
import settings from '../pages/settings.vue';
import wishlist from '../pages/wishlist.vue';
import product from '../pages/product/[slug].vue';
import productCategory from '../pages/product-category/[slug].vue';

// Dynamic component loading
// Map of components
const componentMap: Record<ComponentKey, Component> = {
  'home': home,
  'categories': categories,
  'cart': cart,
  'checkout': checkout,
  'contact': contact,
  'my-account': myAccount,
  'order-summary': orderSummary,
  'products': products,
  'reset-password': resetPassword,
  'settings': settings,
  'wishlist': wishlist,
  'product': product,
  'product-category': productCategory,
};

// Watch for route changes
const route = useRoute();
watch(() => route.fullPath, (newPath) => {
  const pathParts = newPath.split('/').filter(Boolean);
  let key = pathParts[0] || 'home';
  
  if (key === 'product' && pathParts.length > 1) {
    key = 'product';
    currentSlug.value = pathParts.slice(1).join('/');
  } else if (key === 'product-category' && pathParts.length > 1) {
    key = 'product-category';
    currentSlug.value = pathParts.slice(1).join('/');
  
  } else {
    currentSlug.value = null;
  }
  
  console.log("key", key, "slug", currentSlug.value);
  updateCurrentPage(key);
  // console.log(currentSlug.value, 'll',currentComponent.value.name)
}, { immediate: true });

// Computed property to determine which component to render
const currentComponent = computed(() => {

    return componentMap[currentPage.value as ComponentKey] || componentMap.home;
  
});
</script>

<template>
  <div class="sticky top-0 z-40 py-1">
    <PhoneHeader />
  </div>
<!-- <productCategory/> -->
  <div class="h-full">
    <component :is="currentComponent" :slug="currentSlug" />
  </div>

  <div class="bg-white sticky  bottom-0  z-40 pt-2">
  <n-menu
        v-model:value="activeKey"
        class=" flex justify-around items-center mx-2"
        :options="menuOptions"
        responsive
          @update:value="handleMenuItemClick"
      
      />
</div>
</template>

