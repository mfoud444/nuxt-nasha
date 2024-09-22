<script setup lang="ts">

// State variables for settings
const darkMode = ref(false);
const notifications = ref(true);

// Function to toggle dark mode
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};

// Function to toggle notifications
const toggleNotifications = () => {
  notifications.value = !notifications.value;
};
</script>

<template>
  <div class="pb-4 px-2 rounded-md space-y-2">
    <NCard title="Account Settings">
      <div class="flex flex-col space-y-2">
        <SettingsElement
          header="Orders"
          prefixIcon="lets-icons:order-light"
          suffixIcon="ion:more"
        />
        <NDivider />
        <SettingsElement
          header="Shipping Address"
          prefixIcon="mdi:address-marker-outline"
          suffixIcon="ion:more"
        />
        <NDivider />
        <SettingsElement
          header="Payment Methods"
          prefixIcon="mdi:payment"
          suffixIcon="ion:more"
        />
        <NDivider />
        <SettingsElement
          header="Change Password"
          prefixIcon="mdi:password-outline"
          suffixIcon="ion:more"
        />

      </div>
    </NCard>


    <NCard title="Preferences">
      <div class="flex flex-col space-y-2">

        <SettingsElement
          header="Language"
          prefixIcon="ic:baseline-language"
          suffixIcon="ion:more"
        />
        <NDivider />
        <SettingsElement
          header="Notifications"
          prefixIcon="ion:notifications-outline"
          suffixIcon="ion:more"
        />
      </div>
    </NCard>

    <NCard title="Privacy & Security">
      <div class="flex flex-col space-y-2">
        <SettingsElement
          header="Privacy Policy"
          prefixIcon="material-symbols-light:privacy-tip-rounded"
          suffixIcon="ion:more"
        />
        <NDivider />
        <SettingsElement
          header="Terms of Service"
          prefixIcon="hugeicons:google-doc"
          suffixIcon="ion:more"
        />
      </div>
    </NCard>
    <div class="text-center text-gray-500 pt-2">Version 0.0.1</div>
  </div>
</template>
