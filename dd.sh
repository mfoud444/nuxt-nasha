cp .envproduction .env
npx nuxi generate
npx cap sync
npx cap run android

copy_apk() {
  local apk_path="woonuxt_base/public/apk/nashast-store.apk"

  # Remove the existing APK file if it exists
  if [ -f "$apk_path" ]; then
    echo "Deleting existing APK: $apk_path"
    rm "$apk_path"
  else
    echo "No existing APK found at $apk_path"
  fi

  # Copy the new APK file 
  cp "android/app/build/outputs/apk/debug/app-debug.apk" "$apk_path"
   echo "Sucessful Copy new file"
}
copy_apk