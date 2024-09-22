<script lang="ts" setup>
import { ProductsOrderByEnum } from '#woo';
const { siteName, description, shortDescription, siteImage } = useAppConfig();

// const { data } = await useAsyncGql('getProductCategories', { first: 6 });
// const productCategories = data.value?.productCategories?.nodes || [];

// const { data: productData } = await useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.POPULARITY });
// const popularProducts = productData.value.products?.nodes || [];

const { products, loading: loadingProducts, setProducts } = useProducts();

const loadingCategories = ref(true);
const productCategories = ref([]);

// Use a computed property with a safe check
const popularProducts = computed(() => {
  return products.value && products.value.length > 0 ? products.value.slice(0, 5) : [];
});

onMounted(async () => {
  try {
    // Fetch categories
    const { data: categoryData } = await useAsyncGql('getProductCategories', { first: 6 });
    productCategories.value = categoryData.value?.productCategories?.nodes || [];
    loadingCategories.value = false;

    // Fetch products
    const { data: productData } = await useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.POPULARITY });
    const fetchedProducts = productData.value?.products?.nodes || [];
    setProducts(fetchedProducts);
  } catch (error) {
    console.error('Error fetching data:', error);
    loadingCategories.value = false;
    setProducts([]); // Set products to an empty array in case of error
  }
});

useSeoMeta({
  title: `Home`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

const { isShowingSearch } = useSearching();
import { Capacitor } from '@capacitor/core';
import { onMounted } from 'vue';

const isNative = ref(Capacitor.isNativePlatform());

</script>

<template>
  <main>




    <div v-if="isNative" class="py-1 mx-4 ">
          <ProductSearch class="flex w-full" />
        </div>

    <HeroBanner  v-if="!isNative" />

    <div v-if="!isNative" class="container flex flex-wrap items-center justify-center my-16 text-center gap-x-8 gap-y-4 brand lg:justify-between">
      <img src="/images/logoipsum-211.svg" alt="Brand 1" width="132" height="35" />
      <img src="/images/logoipsum-221.svg" alt="Brand 2" width="119" height="30" />
      <img src="/images/logoipsum-225.svg" alt="Brand 3" width="49" height="48" />
      <img src="/images/logoipsum-280.svg" alt="Brand 4" width="78" height="30" />
      <img src="/images/logoipsum-284.svg" alt="Brand 5" width="70" height="44" />
      <img src="/images/logoipsum-215.svg" alt="Brand 6" width="132" height="40" />
    </div>

    <section :class="isNative ? 'my-0 mx-2' : 'container my-18'">
      <div v-if="!isNative" class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink  class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-3 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <!-- <CategoryCard v-for="(category, i) in productCategories" :key="i" class="w-full" :node="category" /> -->
        <template v-if="loadingCategories">
          <CategoryCardSkeleton v-for="i in 6" :key="i" />
        </template>
        <template v-else>
          <CategoryCard v-for="(category, i) in productCategories" :key="i" class="w-full" :node="category" />
        </template>
      </div>
    </section>

    <section v-if="!isNative" class="container grid gap-4 my-24 md:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/box.svg" width="60" height="60" alt="Free Shipping" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Free Shipping</h3>
          <p class="text-sm">Free shipping on order over €50</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/moneyback.svg" width="60" height="60" alt="Money Back" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Peace of Mind</h3>
          <p class="text-sm">30 days money back guarantee</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/secure.svg" width="60" height="60" alt="Secure Payment" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">100% Payment Secure</h3>
          <p class="text-sm">Your payment are safe with us.</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/support.svg" width="60" height="60" alt="Support 24/7" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Support 24/7</h3>
          <p class="text-sm">24/7 Online support</p>
        </div>
      </div>
    </section>

    <section class="container my-16" v-if="popularProducts">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">Popular Products</h2>
        <NuxtLink class="text-primary" to="/products">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <template v-if="loadingProducts">
        <div class="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8">
          <ProductCardSkeleton v-for="i in 5" :key="i" />
        </div>
        
        </template>
        <template v-else>
          <ProductRow :products="popularProducts" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"/>
        </template>
   
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
