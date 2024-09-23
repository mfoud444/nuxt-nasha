/// <reference types="@capacitor-community/safe-area" />
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nasha.store',
  appName: 'Nasha Store',
  webDir: '.output/public',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  android: {
    allowMixedContent: true
  },
//    server: {
//     url: "http://192.168.99.100:3001",
//     // url:"https://nashastore.netlify.app",
//     cleartext: false
//   },

  // plugins: {
  //   SafeArea: {
  //     enabled: true,
  //     customColorsForSystemBars: true,
  //     statusBarColor: '#000000',
  //     statusBarContent: 'light',
  //     navigationBarColor: '#000000',
  //     navigationBarContent: 'light',
  //     offset: 0,
  //   },
  // },
 
};

export default config;
