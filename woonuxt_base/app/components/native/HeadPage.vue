<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};

const props = defineProps({
  header: {
    type: String as PropType<string>,
    required: false,
  },
  iconEnd: {
    type: String as PropType<string>,
    required: false,
  },
 
});
</script>

<template>
  <header class="sticky top-0 z-40">
    <div class="container flex items-center justify-between py-6 pb-2">
      <div class="flex items-center">
        <SvgIcon icon="ion:arrow-back" class="text-2xl cursor-pointer" @click="goBack" />
      </div>
      <div class=" font-bold">
        {{header}}
      </div>
      <div>
        <SvgIcon :icon="iconEnd" class="text-2xl" @click="goBack" />
      </div>
    </div>
  </header>
</template>
