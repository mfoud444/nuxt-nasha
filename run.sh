#!/bin/bash

# Define the sudo password
sudo_password="009988"

# Start the LAMPP server with the password provided automatically
echo "$sudo_password" | sudo -S /opt/lampp/lampp start

# Copy the environment file if the password matches
if [ "$sudo_password" == "009988" ]; then
  cp .envdevelopment .env
  
  # Start the Nuxt.js development server in the background
  npm run dev &

  # Wait for a short time to ensure the server starts properly
  sleep 5
  
  # Open a new terminal tab and run the following commands
  gnome-terminal -- bash -c "
    npx nuxi generate;
    npx cap sync;
    npx cap run android;
    exec bash
  "
else
  echo "Incorrect password. Exiting script."
  exit 1
fi
