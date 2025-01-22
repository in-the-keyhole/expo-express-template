# Node Express: Expo Template

An Express + React-Native (web, iOS, android) template for helping others build their own apps.
This was built by updating and extending the project created by create-expo-app.

You can find more information on Expo here.
https://docs.expo.dev/workflow/overview/

# Prerequisites
git, nvm, Node 22.12.0, Android Studio, Android SDK 35, Xcode, VSCode (preferred). Create an android emulator.

# Building web and server for prod
yarn build
Now you can hit port 8080 with a web browser to see the client

# Testing web and server locally as if prod
yarn start

# Testing the server locally (prereq for testing the client)
cd server
yarn go

# Testing the client locally
cd client
yarn web or yarn ios or yarn android
