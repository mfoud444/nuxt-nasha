<script lang="ts" setup>
const { t } = useI18n();
const carouselItems = [
  { header: t('messages.general.welcome'), label: t('messages.general.browseProducts'), src: '/images/b1.png' },
  { header: t('messages.general.exclusiveDeals'), label: t('messages.general.todayOffers'), src: '/images/b2.png' },
  { header: t('messages.general.newArrivals'), label: t('messages.general.exploreProducts'), src: '/images/b3.png' },
  { header: t('messages.general.joinCommunity'), label: t('messages.general.signUpDeals'), src: '/images/b4.png' }
];

const currentIndex = ref(0); // Tracks the current index of the carousel
const showStartButton = ref(false); // Controls the visibility of the "Start" button
const router = useRoute();

function handleIndexChange(newIndex: number, lastIndex: number) {
    console.log(newIndex, carouselItems.length - 1)
  // Check if the current index is the last slide
  if (newIndex === carouselItems.length - 1) {
    console.log(newIndex, carouselItems.length - 1)
    showStartButton.value = true;
    goToHome()
  } else {
    showStartButton.value = false;
  }
}


function goToHome() {
  router.push('/'); // Navigate to the home page
}
const carouselRef = ref();
onMounted(() => {
  const currentIndex = carouselRef.value?.getCurrentIndex();
  console.log("Initial Carousel Index:", currentIndex); // Outputs the current index of the carousel
});
</script>

<template>
  <div class="m-0 space-y-3">
    <n-carousel
      class="rounded-md"
         ref="carouselRef"
      show-arrow
      :loop=false
      :on-update:current-index="handleIndexChange" 
    >
 
      <InterElement 
        v-for="(item, index) in carouselItems"
        :key="index"
        :header="item.header"
        :label="item.label"
        :src="item.src"
      />
    
      <!-- Custom arrows for navigation -->
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click="prev">
            <SvgIcon icon="material-symbols-light:arrow-back" />
          </button>
          <button type="button" class="custom-arrow--right" @click="next">
            <SvgIcon icon="material-symbols-light:arrow-forward" />
          </button>
        </div>
      </template>

      <!-- Custom dots for navigation -->
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

    <!-- Display the "Start" button only on the last slide -->
    <div v-if="showStartButton" class="flex justify-center mt-4  top-40 items-center">
      <n-button type="primary" @click="goToHome">{{ $t('messages.general.start') }}</n-button>
    </div>
  </div>
</template>

<style scoped>
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
  bottom: 100px;
  right: 10px;
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
  bottom: 150px;
  right: 20px;
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
