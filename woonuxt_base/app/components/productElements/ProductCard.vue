<script setup lang="ts">
const route = useRoute();
const { storeSettings } = useAppConfig();
const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 220;
const imgHeight = Math.round(imgWidth * 1.125);

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const mainImage = computed<string>(() => props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) => paColor.value.some((color) => attribute.value.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug?.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0].image?.producCardSourceUrl || activeColorImage[0].image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});

import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo';

const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers();
const { addToCart, isUpdatingCart } = useCart();

const errorMessage = ref('');

const handleAddToCart = async (input: AddToCartInput) => {
  isUpdatingCart.value = true;
  errorMessage.value = ''; // Clear any previous error message

  try {
    await addToCart(input);;
  } catch (error: any) {
    console.error('Error adding item to cart:', error);
    errorMessage.value = error || 'There was an error adding the item to your cart. Please try again.';
  } finally {
    isUpdatingCart.value = false;
  }
};

const quantity = ref<number>(1);
const activeVariation = ref<Variation | null>(null);
const variation = ref<Attribute[]>([]);
const indexOfTypeAny = ref<number[]>([]);
const attrValues = ref();
const isSimpleProduct = computed<boolean>(() => props.node?.type === ProductTypesEnum.SIMPLE);
const isVariableProduct = computed<boolean>(() => props.node?.type === ProductTypesEnum.VARIABLE);

const type = computed(() => activeVariation.value || props.node);
const selectProductInput = computed<any>(() => ({ productId: type.value?.databaseId, quantity: quantity.value })) as ComputedRef<AddToCartInput>;

const mergeLiveStockStatus = (payload: Product): void => {
  props.node.stockStatus = payload.stockStatus ?? props.node?.stockStatus;

  payload.variations?.nodes?.forEach((variation: Variation, index: number) => {
    if (props.node?.variations?.nodes[index]) {
      props.node.variations.nodes[index].stockStatus = variation.stockStatus;
    }
  });
};

onMounted(async () => {
  try {
    const { product } = await GqlGetStockStatus({ slug });
    if (product) mergeLiveStockStatus(product as Product);
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0].message;
    if (errorMessage) console.error(errorMessage);
  }
  if (props.node.variations) indexOfTypeAny.value.push(...checkForVariationTypeOfAny(props.node));
});

const updateSelectedVariations = (variations: Attribute[]): void => {
  if (!props.node.variations) return;

  attrValues.value = variations.map((el) => ({ attributeName: el.name, attributeValue: el.value }));
  const cloneArray = JSON.parse(JSON.stringify(variations));
  const getActiveVariation = props.node.variations?.nodes.filter((variation: any) => {
    // If there is any variation of type ANY set the value to ''
    if (variation.attributes) {
      indexOfTypeAny.value.forEach((index) => (cloneArray[index].value = ''));
      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(cloneArray));
    }
  });

  activeVariation.value = getActiveVariation[0];
  selectProductInput.value.variationId = activeVariation.value?.databaseId ?? null;
  selectProductInput.value.variation = activeVariation.value ? attrValues.value : null;
  variation.value = variations;
};

const stockStatus = computed(() => {
  if (isVariableProduct.value) return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
  return type.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
});
const disabledAddToCart = computed(() => {
  if (isSimpleProduct.value) return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || isUpdatingCart.value;
  return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || !activeVariation.value || isUpdatingCart.value;
});
import { Capacitor } from '@capacitor/core';
const isNative = ref(Capacitor.isNativePlatform());
const { addToWishlist, removeFromWishlist, isInList } = useWishlist();


const isWishlisted = computed(() => (props.node.databaseId ? isInList(props.node.databaseId) : false));

const toggleWishlist = () => (isWishlisted.value && props.node.databaseId ? removeFromWishlist(props.node.databaseId) : addToWishlist(props.node));
</script>



<template>

  <div class="relative product-card p-2   flex w-full max-w-xs flex-col justify-between overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <NuxtLink :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
      <SaleBadge :node="node" class="absolute top-2 right-2" />
      <NuxtImg
        v-if="imagetoDisplay"
        :width="imgWidth"
        :height="imgHeight"
        :src="imagetoDisplay"
        :alt="node.image?.altText || node.name || 'Product image'"
        :title="node.image?.title || node.name"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        :sizes="`${imgWidth / 2}px md:${imgWidth}px`"
        placeholder
        placeholder-class="blur-xl" />
    </NuxtLink>
 
      <StarRating v-if="storeSettings.showReviews" :rating="node.averageRating" :count="node.reviewCount" />
      <NuxtLink :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
        <n-ellipsis  class="mb-2 font-light leading-tight" :line-clamp="2">
          {{ node.name }}
  </n-ellipsis>
        <!-- <h2 class="mb-2 font-light leading-tight">{{ node.name }}</h2> -->
      </NuxtLink>
      <div class="text-sm">
      <ProductPrice  :sale-price="node.salePrice" :regular-price="node.regularPrice" />
    </div>
      <div class="flex   self-justify-end gap-4 justify-between items-end ">
        <div>
        <button type="button" class="cursor-pointer flex mt-4 text-sm text-gray-400 gap-2 items-center" @click="toggleWishlist">
    <Icon v-if="isWishlisted" name="ion:heart" size="30" class="text-red-400" />
    <Icon v-else name="ion:heart-outline" size="30" />
   
  </button>
</div>
        
      <form  @submit.prevent="handleAddToCart(selectProductInput)">
          <AttributeSelections
            v-if="node.type == 'VARIABLE' && node.attributes && node.variations"
            class="mt-8 mb-8"
            :attributes="node.attributes.nodes"
            :defaultAttributes="node.defaultAttributes"
            :variations="node.variations.nodes"
            @attrs-changed="updateSelectedVariations" />
        
            <input
              v-model="quantity"
              type="number"
              :hidden=true
              min="1"
              aria-label="Quantity"/>
            <AddToCartButton class="" :disabled="disabledAddToCart" :class="{ loading: isUpdatingCart }" :only-icon="true" />
       
      
        </form>

      </div>

 
  </div>
</template>

<style lang="postcss">
.product-card img {
  @apply rounded-lg object-top object-cover w-full;
  aspect-ratio: 1/1.125;
}

.product-card:hover {
  h2 {
    @apply text-primary;
  }
}
</style>
