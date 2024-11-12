<script setup lang="ts">
const { theList } = useWishlist();
</script>
<template  >
    <header  class="sticky top-0 z-40  bg-white">
      <div class="container flex items-center  justify-between py-4 pb-2">
        <!-- <div  class="flex items-center">
          <Logo class="md:w-[160px]" />
        
        </div> -->
       
        <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-4 md:gap-6">
          
          <!-- <SearchTrigger /> -->
          <div class="flex gap-4 items-center">
            <NBadge
    :value="theList.length"
    type="info"
  >
            <NuxtLink  to="/wishlist" :prefetch="false">

              <SvgIcon icon="ion:heart-outline" class=" text-2xl font-semibold"/>
            </NuxtLink>
            </NBadge>
            <SignInLink />
            <CartTrigger />
          </div>
        </div>
      </div>
     
        <!-- <div class="py-1 mx-4 ">
          <ProductSearch class="flex w-full" />
        </div> -->
  
    </header>
  </template>