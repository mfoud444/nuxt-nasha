/**
 * App configuration
 * This file is used to configure the app settings.
 * Below are the default values.
 */
import { Capacitor } from '@capacitor/core';
// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();
export default defineAppConfig({
  siteName:  "t('messages.general.siteName')" ,
  shortDescription:  "t('messages.general.shortDescription')" ,
  description:  "t('messages.general.description')" ,
  baseUrl: 'https://nashastore.netlify.app',
  siteImage: 'http://192.168.99.176:3001/images/logo.png',
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: false,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: false,
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
    isNative: false ,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    googlePlayLink:"https://play.google.com/store/apps/details?id=com.nasha.store",
  },
});

