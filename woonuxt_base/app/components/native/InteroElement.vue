<script lang="ts" setup>
const props = defineProps({
  header: {
    type: String as PropType<string>,
    required: true,
  },
  label: {
    type: String as PropType<string>,
    required: true,
  },
  src: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>

<template>
 
<div class=" flex flex-col text-center gap-12">


<div class=" gtext font-bold text-4xl ">
{{ header }}
</div>

<div class="text-xl ">
  {{ label }}
</div>
    <img
      class="carousel-img rounded-md"
      :src="src"
    >

</div>
  
 
</template>
