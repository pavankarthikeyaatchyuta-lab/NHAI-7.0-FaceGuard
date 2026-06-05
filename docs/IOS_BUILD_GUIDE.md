# iOS Build Guide

FaceGuard is structured as a cross-platform React Native application. The repository can be prepared on Windows, but building iOS requires macOS with Xcode or a cloud build service.

## Local macOS Build

Prerequisites:

- macOS with current Xcode.
- CocoaPods.
- Node.js 22 or newer.
- Apple Developer account for device signing.

Commands:

```bash
cd FaceGuard/mobile
npm install
cd ios
pod install
cd ..
npm run ios
```

## Cloud Build From Windows

Recommended options:

- GitHub Actions on macOS runners.
- Expo EAS custom dev client if the native module set is supported.
- Codemagic or Bitrise for React Native iOS builds.

## Required iOS Permissions

Add to `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>FaceGuard uses the camera for offline personnel verification.</string>
```

## Native Modules To Verify

| Module | iOS Check |
|---|---|
| `react-native-vision-camera` | Camera permission and frame capture |
| `onnxruntime-react-native` | Model loading and CPU/Core ML execution |
| `react-native-keychain` | Keychain-backed encryption key storage |
| `react-native-quick-crypto` | AES-GCM encryption compatibility |
| `@react-native-community/netinfo` | Connectivity restoration detection |

## Release Checklist

- Use a production signing identity.
- Replace any demo keys.
- Verify model files are bundled correctly.
- Test offline enrollment and verification on a physical iPhone.
- Confirm no raw camera frames are persisted.
- Confirm sync queue purges only accepted event IDs.
