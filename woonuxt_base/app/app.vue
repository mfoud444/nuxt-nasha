<script setup lang="ts">

const route = useRoute();
const { isShowingCart, toggleCart } = useCart();
const { isShowingMobileMenu, toggleMobileMenu, addBodyClass, removeBodyClass } = useHelpers();
const { siteName } = useAppConfig();
const closeCartAndMenu = () => {
  toggleCart(false);
  toggleMobileMenu(false);
};

watch([isShowingCart, isShowingMobileMenu], () => {
  isShowingCart.value || isShowingMobileMenu.value ? addBodyClass('overflow-hidden') : removeBodyClass('overflow-hidden');
});

watch(
  () => route.path,
  () => closeCartAndMenu(),
);
function estimatedProgress(duration, elapsed) {
  // Start from 50% and calculate progress
  const baseProgress = 50;
  const progress = (elapsed / duration) * 50;
  return Math.min(baseProgress + progress, 100);
}
const hideHeaderFooter = ref(false);
watch(
  () => route.path, // Watch for changes in the route path
  (newPath) => {
    const hideRoutes = ['/login', '/register', '/my-account']; // Add the routes you want to hide header and footer for
    // Use route matching to handle paths accurately (trims trailing slashes)
    hideHeaderFooter.value = hideRoutes.some((path) => newPath.startsWith(path));
  },
  { immediate: true } // Ensures that the watcher runs immediately on page load
);
useHead({
  titleTemplate: `%s - ${siteName}`,
});




const { viewer, customer } = useAuth();
const { cart } = useCart();

const showLoader = computed(() => !viewer && !customer);


const carouselItems = [
  { header: 'Welcome to App', label: 'Browse our latest products', src: '/images/b1.png' },
  { header: 'Exclusive Deals', label: 'Check out today’s offers', src: '/images/intero22.png' },
  { header: 'New Arrivals', label: 'Explore the newest products', src: '/images/intero3.webp' },
  { header: 'Join Our Community', label: 'Sign up for exclusive deals', src: '/images/b4.png' }
];

const currentIndex = ref(0); // Tracks the current index of the carousel
const showStartButton = ref(false); // Controls the visibility of the "Start" button
const router = useRoute();
const skip = ref(false);
function handleIndexChange(newIndex: number, lastIndex: number) {
  console.log(newIndex, carouselItems.length - 1)
  // Check if the current index is the last slide
  if (newIndex === carouselItems.length - 1) {
    console.log(newIndex, carouselItems.length - 1)
    showStartButton.value = true;
    // goToHome()
  } else {
    showStartButton.value = false;
  }
}


// function goToHome() {
//   router.push('/'); // Navigate to the home page
// }
const carouselRef = ref();
onMounted(() => {
  const currentIndex = carouselRef.value?.getCurrentIndex();
  if (!isNative) {
    document.documentElement.classList.add('custom-scrollbar');
  } else {
    document.documentElement.classList.remove('custom-scrollbar');
  }
});

const { storeSettings } = useAppConfig();

const isNative = storeSettings.isNative;
</script>

<template>

  <template v-if="skip && isNative">
    <div class="m-0 space-y-3 h-screen container">
      <button
        type="button"
        class=" bg-red-200 cursor-pointer text-md w-16 text-center rounded-full my-8 font-bold"
        @click="skip = true"
      >
        skip
      </button>

      <n-carousel
        class="rounded-md"
        ref="carouselRef"
        show-arrow
        :loop=false
        :on-update:current-index="handleIndexChange"
      >

        <InteroElement
          v-for="(item, index) in carouselItems"
          :key="index"
          :header="item.header"
          :label="item.label"
          :src="item.src"
        />

        <template #arrow="{ prev, next }">
          <div
            class="custom-arrow"
            v-if="!showStartButton"
          >
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

          <div
            v-if="showStartButton"
            class="flex justify-center mt-4 w-24    absolute bottom-[250px] right-[10px] items-center"
          >
            <n-button
              type="primary"
              style="width: 100%;"
              @click="skip = true"
            >Start</n-button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index in total"
              :key="index"
              :class="{ 'is-active gtext': currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>

    </div>
  </template>

  <template v-else>



    <div dir="rtl" :class=" isNative ? 'flex flex-col h-screen overflow-hidden' : 'overflow-auto '">

      <PhoneHeader v-if="isNative" />
      <LazyAppHeader v-if="!isNative" />
     

      <Transition name="slide-from-right">
        <LazyCart v-if="isShowingCart" />
      </Transition>

      <Transition name="slide-from-left">
        <MobileMenu v-if="isShowingMobileMenu" />
      </Transition>


      <div 
      class="overflow-x-hidden" 
      :class="isNative ? 'flex-1 flex flex-col py-1 overflow-scroll' : ''">

        <NuxtLoadingIndicator>

        </NuxtLoadingIndicator>

        <!-- page-key="static" -->
        <NuxtPage  />
        <Transition name="fade">
          <div
            v-if="isShowingCart || isShowingMobileMenu"
            class="bg-black opacity-25 inset-0 z-40 fixed"
            @click="closeCartAndMenu"
          />
        </Transition>
      </div>


      <LazyPhoneFooter v-if="isNative" />

      <LazyAppFooter v-if="!isNative" />

    </div>

  </template>



</template>

<style lang="postcss">
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 260px;
  right: 0px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #ffffff;
  background-color: rgba(1, 1, 14, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(5, 0, 0, 0.2);
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
  bottom: 300px;
  right: 10px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(5, 20, 51, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #031835;
}


html.custom-scrollbar {
  /* Apply the custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
}
html,
body {
  padding-top: calc(var(--safe-area-inset-top) + 1rem);
  @apply bg-gray-100 text-gray-900 mx-0 mt-0 md:container overflow-x-hidden;
  scroll-behavior: smooth;
}

img {
  image-rendering: crisp-edges;
  image-rendering: -webkit-optimize-contrast;
}

pre {
  @apply rounded bg-gray-800 my-8 text-xs text-white p-4 whitespace-pre-wrap overflow-auto;
}

select {
  @apply bg-white border rounded-md font-medium border-gray-300 flex-1 text-sm p-1.5 pr-12 pl-4 text-gray-500 relative inline-flex items-center hover:bg-gray-50 focus:z-20 py-2 px-4 appearance-none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4 6l4 4 4-4'/%3E%3C/svg%3E") center right 10px no-repeat;
  background-size: 1rem;
  padding-right: 2.5rem;
}

/* Slide-from-right & Slide-from-left */
.slide-from-right-leave-active,
.slide-from-right-enter-active,
.slide-from-left-leave-active,
.slide-from-left-enter-active {
  transition: transform 300ms ease-in-out;
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(500px);
}

.slide-from-left-enter-from,
.slide-from-left-leave-to {
  transform: translateX(-500px);
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale Y */
.scale-y-enter-active,
.scale-y-leave-active {
  transition: all 500ms linear;
  will-change: max-height, opacity;
  max-height: 9999px;
  overflow: hidden;
  opacity: 1;
}

.scale-y-enter-from,
.scale-y-leave-to {
  max-height: 0;
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.custom-scrollbar::-webkit-scrollbar-track,
.custom-scrollbar::-webkit-scrollbar {
  @apply rounded bg-gray-100 w-1.5;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply rounded bg-gray-400;
}

@keyframes fadeIn {
  0% {
    opacity: 0.001;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeDisabledIn {
  0% {
    opacity: 0.001;
  }

  100% {
    opacity: 0.7;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.001;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 20ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.page-enter-active {
  animation-duration: 200ms;
  animation-name: fadeIn;
  animation-timing-function: linear;
  backface-visibility: hidden;
}

.page-leave-active {
  animation-name: fadeOut;
  animation-duration: 200ms;
}

@keyframes skelaton {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

img.skeleton {
  animation: skelaton 2000ms infinite cubic-bezier(0.4, 0, 0.2, 1);
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
}
</style>
