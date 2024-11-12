<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { storeSettings } = useAppConfig();


const { locales, locale, setLocaleCookie } = useI18n();
const darkMode = ref(false);
const notifications = ref(true);
const showLanguageDialog = ref(false);
const selectedLanguage = ref(locale.value);
watch(selectedLanguage, (newLang) => {
  if (newLang) {
    locale.value = newLang;
    setLocaleCookie(newLang); 
    showLanguageDialog.value = false;
  }
});

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};
const toggleNotifications = () => {
  notifications.value = !notifications.value;
};
const currentLanguageName = computed(() => {
  return locales.value.find((loc) => loc.code === selectedLanguage.value)?.name || '';
});

const openPrivacyPolicy = () => {
  window.open('https://your-privacy-policy-url.com', '_blank');
};

const openTermsOfService = () => {
  window.open('https://your-terms-of-service-url.com', '_blank');
};

// Function to open app store or rate app
const rateApp = () => {
  window.open(storeSettings.googlePlayLink, '_blank'); // Replace with actual URL to rate the app
};

import { Share } from '@capacitor/share';

const { t } = useI18n();
// Function to share the app
const shareApp = async () => {
  await Share.share({
  title: t('messages.share.title'),
  text: t('messages.share.text'),
  url: storeSettings.googlePlayLink,
  dialogTitle: t('messages.share.dialogTitle')
});
  // if (navigator.share) {
  //   navigator.share({
  //     title: 'Check out this app!',
  //     text: 'Download and try this amazing app!',
  //     url: 'https://your-app-url.com', // Replace with your app's URL
  //   }).catch(console.error);
  // } else {
  //   alert('Sharing is not supported in this browser.');
  // }
};



const isLogin = ref(false);
const router = useRouter();
</script>
<template>
  <main>
    <div v-if="!isLogin" class="pb-4 px-2 rounded-md space-y-2">
      <div class="bg-blue-100 rounded-lg shadow-sm h-[150px] p-4 w-full grid grid-cols-2">
        <div>
          <img class="rounded-md h-[150px]" src="/images/pre.webp">
        </div>
        <div class="flex flex-col justify-center">
          <div class="gtext font-bold text-lg">{{ $t('messages.general.getFullAccessApp') }}</div>
          <button @click="router.push({ path:'/auth'});" class="bg-yellow-500 font-bold text-center rounded-lg py-2 mt-2 text-gray-100">
            {{ $t('messages.general.signUp') }}
          </button>
        </div>
      </div>
    </div>
    <!-- v-if="isLogin" -->
    <NCard  :title="$t('messages.account.accountSettings')">
      <div class="flex flex-col space-y-2">
        <SettingsElement :header="$t('messages.account.orders')" prefixIcon="lets-icons:order-light" suffixIcon="ion:more" />
        <NDivider />
        <SettingsElement :header="$t('messages.account.shippingAddress')" prefixIcon="mdi:address-marker-outline" suffixIcon="ion:more" />
        <NDivider />
        <SettingsElement :header="$t('messages.account.paymentMethods')" prefixIcon="mdi:payment" suffixIcon="ion:more" />
        <NDivider />
        <SettingsElement :header="$t('messages.account.changePassword')" prefixIcon="mdi:password-outline" suffixIcon="ion:more" />
      </div>
    </NCard>

    <NCard :title="$t('messages.account.preferences')">
      <div class="flex flex-col space-y-2">
        <SettingsElement
          :header="$t('messages.general.language')"
          :label="currentLanguageName"
          prefixIcon="ic:baseline-language"
          suffixIcon="ion:more"
          @click="showLanguageDialog = true" 
        />
        <n-modal v-model:show="showLanguageDialog" :mask-closable="false" preset="dialog" :title="$t('messages.general.language')">
          <n-radio-group v-model:value="selectedLanguage">
            <div class="flex flex-col my-8 gap-4">
              <n-radio v-for="locale in locales" :key="locale.code" :value="locale.code" :label="locale.name">
                {{ locale.name }}
              </n-radio>
            </div>
          </n-radio-group>
        </n-modal>

        <NDivider />

        <SettingsElement
          :header="$t('messages.account.rateApp')"
          prefixIcon="mdi:star-outline"
          suffixIcon="ion:more"
          @click="rateApp"
        />
        <SettingsElement
          :header="$t('messages.account.shareApp')"
          prefixIcon="mdi:share-variant-outline"
          suffixIcon="ion:more"
          @click="shareApp"
        />
      </div>
    </NCard>

    <NCard :title="$t('messages.account.privacySecurity')">
      <div class="flex flex-col space-y-2">
        <SettingsElement
          :header="$t('messages.account.privacyPolicy')"
          prefixIcon="material-symbols-light:privacy-tip-rounded"
          suffixIcon="ion:more"
          @click="openPrivacyPolicy"
        />
        <NDivider />
        <SettingsElement
          :header="$t('messages.account.termsOfService')"
          prefixIcon="hugeicons:google-doc"
          suffixIcon="ion:more"
          @click="openTermsOfService"
        />
      </div>
    </NCard>

    <div class="text-center text-gray-500 pt-2">{{ $t('messages.account.version') }}</div>
  </main>
</template>
