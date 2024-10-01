<script setup lang="ts">
const { t } = useI18n();
const carouselItems = [
  { header: t('messages.general.welcome'), label: t('messages.general.browseProducts'), src: '/images/b1.png' },
  { header: t('messages.general.exclusiveDeals'), label: t('messages.general.todayOffers'), src: '/images/intero22.png' },
  { header: t('messages.general.newArrivals'), label: t('messages.general.exploreProducts'), src: '/images/intero3.webp' },
  { header: t('messages.general.joinCommunity'), label: t('messages.general.signUpDeals'), src: '/images/b4.png' }
];

const currentIndex = ref(0);
const showStartButton = ref(false);
const router = useRoute();
const { viewer, customer } = useAuth();
const {isShowIntero} = useHelpers();
const { cart } = useCart();

const isLogin = computed(() => viewer.value !== null);

const skip = ref(isLogin.value);
function handleIndexChange(newIndex: number, lastIndex: number) {
  console.log(newIndex, carouselItems.length - 1)
  // Check if the current index is the last slide
  if (newIndex === carouselItems.length - 1) {
    console.log(newIndex, carouselItems.length - 1)
    showStartButton.value = true;
    isShowIntero.value = false;
    // goToHome()
  } else {
    showStartButton.value = false;
  }
}

const carouselRef = ref();
onMounted(() => {
  const currentIndex = carouselRef.value?.getCurrentIndex();

});

const { storeSettings } = useAppConfig();

const isNative = storeSettings.isNative;
const showModal = ref(!isLogin.value && isShowIntero.value)

function skipIntero(){
  showModal.value = false;
  isShowIntero.value = false;
}
</script>

<template>

<n-modal v-model:show="showModal">


    <div class="m-0 space-y-3 h-screen overflow-hidden container bg-slate-100 ">
      <button
        type="button"
        class=" bg-red-200  py-2 cursor-pointer text-md w-16 text-center rounded-full my-8 font-bold"
        @click="skipIntero"
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
              @click="skipIntero"
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
 
  </n-modal>
</template>

<style lang="postcss">

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 240px;
  right: 0px;
}

.custom-arrow button {
@apply rounded-full bg-red-400 font-bold w-10 h-10 mt-8;
}

.custom-arrow button:hover {
@apply bg-red-600;
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


</style>
