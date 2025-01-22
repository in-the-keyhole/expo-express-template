# Node Express: Expo Template

An Express + React-Native (web, iOS, android) template for helping others build their own apps.
This was built by updating and extending the project created by create-expo-app.

Read this whole file before building your software stack, as there are tips throughout the text.

You can find more information on Expo here.
https://docs.expo.dev/workflow/overview/

# Prerequisites
git (including git bash), nvm, Node 22.12.0, yarn, OpenJDK 17+, Android Studio, Android SDK 34, Xcode, VSCode (preferred). Create an android emulator.

# Installers
  - Android Studio https://developer.android.com/studio
  - VSCode https://code.visualstudio.com/

## Mac Installers
  - git brew install git
  - nvm https://github.com/nvm-sh/nvm
  - Java https://sdkman.io/
    sdk install java 17.0.0-tem
  - Xcode https://apps.apple.com/us/app/xcode/id497799835?mt=12

## Windows extras:
  - nvm version I use: https://github.com/coreybutler/nvm-windows
  - git (with git bash) https://gitforwindows.org/
  - Java https://aka.ms/download-jdk/microsoft-jdk-17.0.13-windows-x64.msi
  - Use git bash instead of Powershell or Command Prompt
  - Install the Android SDK to a path with no whitespace (something like C:\Android\sdk)
  - Set ANDROID_HOME to {your android sdk path} in the environment variables
  - Add {your android sdk path}\sdk\platforms and {your android sdk path}\sdk\platform-tools to your Path environment variable
  - Run this in git bash to allow long file names.

git config --global core.longpaths true

  - Run this command in Powershell to fix Android Studio issue of producing very long file names.

New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
-Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force


# Install node
To install node:
nvm install 22.12.0
nvm use 22.12.0

# install yarn
To install yarn:
npm install -g yarn

# Set up the server .env file
Copy the file "server/.envcopyme.to.env" to ".env" because the .env file is not checked into the repo. This sets up the port to use.

# Building web and server for prod
yarn build (or buildwin for Windows)
yarn start (or startwin for Windows)
Now you can hit port 8080 with a web browser to see the client

react/renderer/components/rngesturehandler_codegen/rngesturehandler_codegenJSI-generated.cpp.o

# Testing the server locally (prereq for testing the client)
cd server
yarn go (or yarn gowin for Windows)

For Windows, instead of yarn gowin I'd recommend using VSCode, selecting the server/src/app.ts file, and hitting F5 to start debugging.

# Testing the client locally
cd client
yarn install
yarn web or yarn ios or yarn android
