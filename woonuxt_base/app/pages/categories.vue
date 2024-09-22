<script lang="ts" setup>
const { data: categoryData } = await useAsyncGql('getProductCategories');
const productCategories = categoryData.value.productCategories?.nodes as ProductCategory[];

useHead({
  title: `Categories`,
  meta: [{ name: 'description', content: 'All product categories' }],
  link: [{ rel: 'canonical', href: 'https://nasha.com/categories' }],
});


const { setProducts, updateProductList } = useProducts();
const { storeSettings } = useAppConfig();

const productsInCategory = ref<Product[]>([]);  // Ref to hold the products in the selected category
const isLoading = ref(true);

// Function to fetch products by category slug
async function fetchProductCategory(slug: string) {
  isLoading.value = true;
  const { data: productData } = await useAsyncGql('getProducts', { slug });
  productsInCategory.value = (productData.value.products?.nodes || []) as Product[];
  setProducts(productsInCategory.value);
  updateProductList();
  isLoading.value = false;
}

// Handle the change of the selected tab (category)
async function handleUpdateValue(value: string) {
  console.log(value)

  await fetchProductCategory(value);

}

// Fetch initial products when the component is mounted
onMounted(async () => {
  if (productCategories.length) {
   await handleUpdateValue(productCategories[0]?.slug as string); // Fetch products for the first category by default
  }
});


</script>
<template>
      <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[500px]">
      <LoadingIcon />  <!-- Show loading indicator -->
    </div>
  <main v-else class="container">
    <n-tabs
      class="pb-1"
      @update:value="handleUpdateValue"
      type="line"
    >
      <n-tab-pane
        v-for="(category, index) in productCategories"
        :key="index"
        :name="category.slug"
        :tab="category.name"
      >
        <!-- Loading state -->
        <div
          v-if="isLoading"
          class="flex flex-col min-h-[500px]"
        >
          <LoadingIcon class="m-auto" />
        </div>

        <!-- Products found state -->
        <div
          v-else-if="productsInCategory.length"
          class=" flex items-start gap-16"
        >
          <Filters
            v-if="storeSettings.showFilters"
            :hide-categories="true"
          />

          <div class="w-full">
            <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
              <ProductResultCount />
              <OrderByDropdown
                class="hidden md:inline-flex"
                v-if="storeSettings.showOrderByDropdown"
              />
              <ShowFilterTrigger
                v-if="storeSettings.showFilters"
                class="md:hidden"
              />
            </div>
            <ProductGrid />
          </div>
        </div>

        <!-- No products found state -->
        <div
          v-else
          class="flex justify-center items-center min-h-[400px]"
        >
          <n-result
            status="info"
            title="Information"
            description="No products found in this category."
          >
            <template #footer>

            </template>
          </n-result>

        </div>
      </n-tab-pane>
    </n-tabs>
  </main>
</template>

<style scoped>
.custom-tabs .n-tabs-bar {
  background-color: transparent !important;
}

.custom-tabs .n-tabs-bar::after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: -2px;
  border-radius: 2px;
  background-color: var(--bar-color);
}
</style>
