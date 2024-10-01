<script setup lang="ts">
import { NIcon, type MenuOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
import MenuItem from './MenuItem.vue'
const router = useRouter();
const activeKey = ref<string>('shop');
const { currentPage,updateCurrentPage} = useHelpers();
const { t } = useI18n();

function handleMenuItemClick(key: string) {
  switch (key) {
    case 'shop':
      router.push({ path:'/'});
      break;
    case 'category':
      router.push({ path:'/categories'}); 
      break;
    case 'cart':
      router.push({ path:'/cart'}); 
      break;
    case 'me':
    // router.push({ path:'/my-account'}); 
      router.push('/settings'); 
      break;
    default:
      break;
  }
//   updateCurrentPage(key)
//  console.log(currentPage.value)
  activeKey.value = key;
}



const menuOptions: MenuOption[] = [
  {
    label: () => h(MenuItem, { icon: 'ion:home', label: t('messages.menu.shop') }),
    key: 'shop',
  },
  {
    label: () => h(MenuItem, { icon: 'ion:search', label: t('messages.menu.category') }),
    key: 'category',
  },
  {
    label: () => h(MenuItem, { icon: 'ion:cart', label: t('messages.menu.cart') , showCount:true}),
    key: 'cart',
  },
  {
    label: () => h(MenuItem, { icon: 'ion:person', label: t('messages.menu.me') }),
    key: 'me',
  },
];
const route = useRoute();
watch(route, (newRoute) => {
  if (newRoute.path === '/') {
    activeKey.value = 'shop';
  } else if (newRoute.path === '/categories') {
    activeKey.value = 'category';
  } else if (newRoute.path === '/cart' || newRoute.path === '/checkout' || newRoute.path === '/checkout1') {
    activeKey.value = 'cart';
  } else if (newRoute.path === '/my-account') {
    activeKey.value = 'me';
  }
}, { immediate: true });  // Run immediately on component mount

</script>

<template>
<div  class="sticky  bottom-0  z-40 pt-1 bg-white">
  <n-menu
        v-model:value="activeKey"
        class=" flex justify-around   items-center mx-2"
        :options="menuOptions"
        :indent=20
        responsive
          @update:value="handleMenuItemClick"
      
      />
</div>
    
 
 
</template>
