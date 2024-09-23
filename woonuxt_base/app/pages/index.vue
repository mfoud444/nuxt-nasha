<script lang="ts" setup>
import { ProductsOrderByEnum } from '#woo';
const { siteName, description, shortDescription, siteImage } = useAppConfig();
const { products, isLoading: loadingProducts, setProducts } = useProducts();

const { data } = await useAsyncGql('getProductCategories', { first: 6 });
const productCategories = data.value?.productCategories?.nodes || [];

const { data: productData } = await useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.POPULARITY });
const popularProducts = productData.value.products?.nodes || [];


// const loadingCategories = ref(true);
// const productCategories = ref([]);

// // Use a computed property with a safe check
// const popularProducts = computed(() => {
//   return products.value && products.value.length > 0 ? products.value.slice(0, 5) : [];
// });

// async function fetchCategories() {
//   try {
//     // Fetch categories
//     const { data: categoryData } = await useAsyncGql('getProductCategories', { first: 6 });
//     productCategories.value = categoryData.value?.productCategories?.nodes || [];
//     loadingCategories.value = false;

//     // Fetch products
//     const { data: productData } = await useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.POPULARITY });
//     const fetchedProducts = productData.value?.products?.nodes || [];
//     setProducts(fetchedProducts);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     loadingCategories.value = false;
//     setProducts([]); // Set products to an empty array in case of error
//   }
// }
// // fetchCategories();
// onMounted(async () => {
//   await fetchCategories();
// });
// fetchCategories()
const { t } = useI18n();
useSeoMeta({
  title: `Home`,
  ogTitle: t('messages.general.siteName'),
  description: t('messages.general.description'),
  ogDescription: t('messages.general.shortDescription'),
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

const { isShowingSearch } = useSearching();
const { storeSettings } = useAppConfig();

const isNative = storeSettings.isNative;
</script>

<template>
  <main>
    <div class="m-4 mt-2 space-y-3">

      <ProductSearch
        v-if="isNative"
        class="flex w-full"
      />

      <HeroBanner v-if="!isNative" />
      <n-carousel
     
        :class="!isNative ? 'mt-4' : ''"
        class="rounded-md"
        show-arrow
        autoplay
      >
        <img
          class="carousel-img"
          src="/images/b1.png"
        >
        <img
          class="carousel-img"
          src="/images/p2.webp"
        >
        <img
          class="carousel-img"
          src="/images/b3.png"
        >
        <img
          class="carousel-img"
          src="/images/delivary.svg"
        >
        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button
              type="button"
              class="custom-arrow--left"
              @click="prev"
            >
              <SvgIcon icon="material-symbols-light:arrow-back" />
            </button>
            <button
              type="button"
              class="custom-arrow--right"
              @click="next"
            >
              <SvgIcon icon="material-symbols-light:arrow-forward" />
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>

    </div>


    <section :class="isNative ? 'container my-12 mx-2' : 'container my-11'">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink
          class="text-primary"
          to="/categories"
        >{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-3 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <!-- <CategoryCard v-for="(category, i) in productCategories" :key="i" class="w-full" :node="category" /> -->
        <!-- <template v-if="loadingCategories">
          <CategoryCardSkeleton
            v-for="i in 6"
            :key="i"
          />
        </template>
        <template v-else> -->
          <CategoryCard
            v-for="(category, i) in productCategories"
            :key="i"
            class="w-full"
            :node="category"
          />
        <!-- </template> -->
      </div>
    </section>


    <section
      v-if="!isNative"
      class="container grid gap-4 my-24 md:grid-cols-2 lg:grid-cols-4"
    >
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img
          src="/icons/box.svg"
          width="60"
          height="60"
          alt="Free Shipping"
          loading="lazy"
        />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('messages.general.freeShipping') }}</h3>
          <p class="text-sm">{{ $t('messages.general.freeShippingDescription') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img
          src="/icons/moneyback.svg"
          width="60"
          height="60"
          alt="Money Back"
          loading="lazy"
        />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('messages.general.peaceOfMind') }}</h3>
          <p class="text-sm">{{ $t('messages.general.moneyBackGuarantee') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img
          src="/icons/secure.svg"
          width="60"
          height="60"
          alt="Secure Payment"
          loading="lazy"
        />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('messages.general.paymentSecure') }}</h3>
          <p class="text-sm">{{ $t('messages.general.securePaymentDescription') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img
          src="/icons/support.svg"
          width="60"
          height="60"
          alt="Support 24/7"
          loading="lazy"
        />
        <div>
          <h3 class="text-xl font-semibold">{{ $t('messages.general.support') }}</h3>
          <p class="text-sm">{{ $t('messages.general.supportDescription') }}</p>
        </div>
      </div>
    </section>


    <section
      class="container mt-8"
      v-if="popularProducts"
    >
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.popularProducts') }}</h2>
        <NuxtLink
          class="text-primary"
          to="/products"
        >{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <template v-if="loadingProducts">
        <div class="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8">
          <ProductCardSkeleton
            v-for="i in 5"
            :key="i"
          />
        </div>

      </template>
      <template v-else>
        <ProductRow
          :products="popularProducts"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
        />
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

.carousel-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(5, 20, 51, 0.4);
  transition:
    width 0.3s,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #031835;
}
</style>