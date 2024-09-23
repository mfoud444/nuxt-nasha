<script setup lang="ts">
const { toggleMobileMenu, wooNuxtVersionInfo } = useHelpers();

import { NIcon, type MenuOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
const router = useRouter();
const activeKey = ref<string>('shop');
 function handleMenuItemClick(key: string) {
  toggleMobileMenu(false)
  switch (key) {
    case 'shop':
      router.push({ path: "/" }); 
      break;
    case 'category':
     router.push({ path:'/categories'}); 
      break;
    case 'products':
     router.push({ path:'/products'}); 
      break;
    case 'wishlist':
     router.push({ path: "/wishlist" }); 
      break;
    case 'my-account':
      router.push({ path: '/my-account' }); 
      break;
    default:
      break;
  }
  activeKey.value = key;
}

function renderIcon(iconName: string) {
  return () => h(NIcon, null, { default: () => h(Icon, { icon: iconName, width: 38, height: 36 }) });
}
const { t } = useI18n();
const menuOptions: MenuOption[] = [
  {
    label: t('messages.menu.shop'),
    icon: renderIcon('ion:home-outline'),
    key: 'shop'
  },
  {
    label: t('messages.menu.category'),
    icon: renderIcon('ion:search-outline'),
    key: 'category'
  },
  {
    label: t('messages.menu.allProducts'),
    icon: renderIcon('ion:grid-outline'),
    key: 'products'
  },
  {
    label: t('messages.menu.wishlist'),
    icon: renderIcon('ion:heart-outline'),
    key: 'wishlist',
    class: 'lg:hidden'
  },
  {
    label: t('messages.menu.myAccount'),
    icon: renderIcon('ion:person-outline'),
    key: 'my-account',
    class: 'lg:hidden'
  }
];

const route = useRoute();
watch(route, (newRoute) => {
  if (newRoute.path === '/') {
    activeKey.value = 'shop';
  } else if (newRoute.path === '/categories') {
    activeKey.value = 'category';
  } else if (newRoute.path === '/products' || newRoute.path === '/checkout') {
    activeKey.value = 'products';
  } else if (newRoute.path === '/wishlist') {
    activeKey.value = 'wishlist';
  
  } else if (newRoute.path === '/my-account') {
    activeKey.value = 'my-account';
  }
}, { immediate: true });  

</script>

<template>
  <div class="bg-white flex flex-col max-w-lg shadow-lg top-0 bottom-0 left-0 w-11/12 z-50 fixed overflow-x-hidden">
    <div class="mt-16">
    <CloseIcon
      class="bg-red-200 rounded-xl  p-1.5"
      @click="toggleMobileMenu(false)"
    />
  </div>
    <!-- <div class="mt-8 text-center">{{ $t('messages.general.menu') }}</div> -->
    <n-menu
      v-model:value="activeKey"
    
      :options="menuOptions"
      responsive
      @update:value="handleMenuItemClick"
    />
    <!-- <MainMenu class="m-4 grid p-4 text-gray-500 gap-6" /> -->
    <div class="mt-auto text-center p-8 text-[10px] text-gray-400">
      <!-- <a href="/" :title="wooNuxtVersionInfo">WooNuxt v{{ wooNuxtVersionInfo }}</a> -->
    </div>
  </div>
</template>
