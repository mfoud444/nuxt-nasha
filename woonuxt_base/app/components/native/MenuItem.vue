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
});


</script>

<template>
  <div class="flex gap-1   flex-col items-center justify-center">
      <SvgIcon :icon="icon" class="text-xl "/>
      <span class="text-xs">{{ label }}</span>
   
</div>
  </template>
  

  

  