/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: 'Nasha Store',
  shortDescription: 'Your go-to online store for quality products at great prices.',
  description: 'Nasha Store offers a wide range of products from electronics to fashion. Enjoy a seamless shopping experience with features like product reviews, filters, and related product recommendations. Discover our curated collections and shop with confidence at competitive prices.',
  baseUrl: 'https://nashastore.netlify.app',
  siteImage: 'https://user-images.githubusercontent.com/5116925/218879668-f4c1f9fd-bef4-44b0-bc7f-e87d994aa3a1.png',
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
  },
});

