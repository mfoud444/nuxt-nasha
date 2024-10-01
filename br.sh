cp dev/cap.reload.ts capacitor.config.ts
cp dev/.devLN .env
# npx nuxi generate
npx cap sync
npx cap run android 