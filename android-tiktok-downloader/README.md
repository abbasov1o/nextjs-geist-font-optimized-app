# React Native TikTok Downloader App

## Description
This is a React Native app for Android (6.0+) that allows users to input TikTok URLs and automatically detects if the content is a video, photo, or music. It offers download options such as 1080p for videos and mp3/m4a with different kbps for music. The app supports multiple languages (Azerbaijani, Turkish, Russian, English) and features a modern anime-style UI with the ability to change the app logo dynamically.

## Requirements
- Node.js and npm installed
- React Native CLI or Expo CLI installed
- Android Studio with Android SDK for building and running the app on Android devices/emulators

## Installation

1. Clone the repository or copy the project files.

2. Install dependencies:
```bash
npm install
```

3. Run the app on an Android device or emulator:
```bash
npx react-native run-android
```

## Building APK

To build a release APK for Android 6.0+:

1. Generate a signing key (if you don't have one):
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Place the `my-release-key.keystore` file under the `android/app` directory.

3. Edit `android/gradle.properties` and add:
```
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

4. Edit `android/app/build.gradle` to add signing config.

5. Build the APK:
```bash
cd android
./gradlew assembleRelease
```

6. The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`.

## Notes

- The download functionality is currently mocked and does not perform real downloads.
- The app UI is styled with an anime theme and supports dynamic logo changes.
- Language can be selected from the main screen.

## License

MIT License
