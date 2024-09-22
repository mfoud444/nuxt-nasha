<script setup lang="ts">
import { StockStatusEnum } from '#woo';

defineProps({
  stockStatus: { type: String, required: false },
});
const statusMap = {
  [StockStatusEnum.IN_STOCK]: { text: 'messages.shop.inStock', type: 'success' },
  [StockStatusEnum.OUT_OF_STOCK]: { text: 'messages.shop.outOfStock', type: 'error' },
  [StockStatusEnum.ON_BACKORDER]: { text: 'messages.shop.onBackorder', type: 'warning' },
  default: { text: 'Loading', type: 'info' }, // Default case
};
</script>

<template>
 <NBadge
    :value="$t(statusMap[stockStatus]?.text || statusMap.default.text)"
    :type="statusMap[stockStatus]?.type || statusMap.default.type"
  />
</template>
