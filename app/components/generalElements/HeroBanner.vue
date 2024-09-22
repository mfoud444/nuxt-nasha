<!-- <template>
  <div class="relative mx-auto">
    <NuxtImg
      width="1600"
      height="600"
      class="object-cover w-full h-[420px] lg:h-[560px] xl:h-[640px]"
      src="/images/hero.webp"
      alt="Hero image"
      loading="eager"
      sizes="sm:100vw lg:1400px"
      fetchpriority="high"
      preload
      placeholder
      placeholder-class="blur-xl" />
    <div class="container absolute inset-0 flex flex-col items-start justify-center p-8">
      <h1 class="text-3xl font-bold md:mb-4 md:text-4xl lg:text-6xl">Just landed.</h1>
      <h2 class="text-lg font-bold md:mb-4 lg:text-3xl">The Summer Collection</h2>
      <div class="max-w-sm mb-8 text-md font-light lg:max-w-md text-balance">
        <p>Discover the latest trends in our summer collection. From dresses to accessories, we have everything you need to look your best this summer.</p>
      </div>
      <NuxtLink class="px-6 py-3 font-bold text-white bg-gray-800 rounded-xl hover:bg-gray-800" to="/products">Shop now</NuxtLink>
    </div>
  </div>
</template> -->


<template>
  <div class="relative">
    <div
      class="absolute inset-0 blur-xl h-[580px] bg-grad"
      :style="{
        background: 'linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)',
      }"
    ></div>
    <div class="relative">
      <section>
        <div class="max-w-screen-xl mx-auto px-4 py-4 md:pt-8 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
          <div class='flex-none space-y-5 text-center md:text-left max-w-xl'>
            <!-- <a href="javascript:void(0)" class='inline-flex gap-x-6 items-center myglass rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white'>
              <span class='inline-block rounded-full px-3 py-1 bg-indigo-600 text-white'>
                {{ $t('messages.general.news') }}
              </span>
              <p class='flex items-center'>
                {{ $t('messages.general.readLaunchPost') }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </p>
            </a> -->
            <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span>{{ $t('messages.general.startShopping') }}</span>
            </h1>
            <p>
              {{ $t('messages.general.shopDescription') }}
                  </p>
                  <div class='flex flex-col gap-y-3 md:flex-row items-center gap-x-3 sm:text-sm'>
                 
                    
               
           
                      <a href="/apk/nashast-store.apk" class="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                        {{ $t('messages.general.downloadDirect') }}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                      </a>
                      <!-- <a href="javascript:void(0)" class="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex">
                          Contact sales
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                      </a> -->
                  </div>
              </div>
              <div class='flex-1 hidden md:block'>
                <NuxtImg
 
     class="max-w-xl"
      src="/images/hero.webp"
      alt="Hero image"
      loading="eager"
      sizes="sm:100vw lg:1400px"
      fetchpriority="high"
      preload
      placeholder
      placeholder-class="blur-xl" />
                  <!-- <img src="https://raw.githubusercontent.com/sidiDev/remote-assets/c86a7ae02ac188442548f510b5393c04140515d7/undraw_progressive_app_m-9-ms_oftfv5.svg" /> -->
              </div>
          </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      state: false,
      menuItems: [
        { title: 'Features', path: 'javascript:void(0)' },
        { title: 'Integrations', path: 'javascript:void(0)' },
        { title: 'Customers', path: 'javascript:void(0)' },
        { title: 'Pricing', path: 'javascript:void(0)' },
      ],
    };
  },
  methods: {
    toggleState() {
      this.state = !this.state;
    }
  },
};
</script>