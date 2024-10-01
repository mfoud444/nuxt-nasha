<!-- src/components/MenuItem.vue -->
<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';
const props = defineProps({
  icon: {
    type: String as PropType<string>,
    required: true,
  },
  label: {
    type: String as PropType<string>,
    required: true,
  },
  showCount: {
    type: Boolean as PropType<boolean>,
    required: false,
    
  },
  
});

const {  cart } = useCart();
</script>

<template>
  <div class="flex gap-1   flex-col items-center justify-center">
    <div>
      <SvgIcon :icon="icon" class="text-xl "/>
    </div>
     
      <span class="text-xs">{{ label }}</span>
      <span

          v-if="showCount && cart?.contents?.itemCount > 0"
          class="bg-primary rounded-full text-white leading-none min-w-[16px] p-[3px] -top-1 right-2  text-[10px] absolute inline-flex justify-center items-center"
          >{{  cart?.contents?.itemCount }}</span
        >
</div>
  </template>
  

  

  