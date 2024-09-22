<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart, isLoading } = useCart();
</script>

<template>
    <div>
     <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[500px]">
      <LoadingIcon />  <!-- Show loading indicator -->
    </div>
    <!-- <div class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-11/12 max-w-lg overflow-x-hidden bg-white shadow-lg"> -->
    <div v-else class="flex flex-col   overflow-x-hidden h-full ">
        <ClientOnly>
            <template v-if="cart && !cart.isEmpty">
                <div class=" flex-1">
                    <ul class="flex flex-col  gap-4 p-6  md:p-8">
                        <CartCard
                            v-for="item in cart.contents?.nodes"
                            :key="item.key"
                            :item
                        />
                    </ul>
                    <div class="px-8 mb-8 absolute inset-x-0 bottom-8 flex justify-between items-start bg-red-200 gap-8   pt-2 pb-1">
                        <NuxtLink
                            class="block p-3 w-36  mr-8 text-lg text-center flex-1 text-white bg-gray-800 rounded-lg shadow-md justify-evenly hover:bg-gray-900"
                            to="/checkout"
                        >
                            <span class="mx-2">{{ $t('messages.shop.checkout') }}</span>
                            <span v-html="cart.total" />
                        </NuxtLink>
                        <EmptyCart
                            v-if="cart && !cart.isEmpty"
                            class="rounded-lg shadow-lg p-1.5 bg-red-600 text-white hover:bg-red-400 hover:text-white"
                        />
                    </div>
                </div>
            </template>
            <!-- Empty Cart Message -->
            <div
                v-else
                class="flex flex-col items-center justify-center flex-1  mb-12 text-gray-300"
            >
                <Icon
                    name="ion:cart-outline"
                    size="96"
                    class="opacity-50 mb-5"
                />
                <div class="mb-20 text-xl">{{ $t('messages.shop.cartEmpty') }}</div>
            </div>
        </ClientOnly>
      
        <div
            v-if="isUpdatingCart"
            class=" justify-self-end bottom-0 flex items-center justify-center bg-white bg-opacity-25"
        >
            <LoadingIcon />
        </div>
    </div>
</div>
</template>
