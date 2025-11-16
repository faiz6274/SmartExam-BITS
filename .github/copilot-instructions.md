# SmartExam-BITS Copilot Instructions

## Project Overview

SmartExam-BITS is a React Native + Expo exam management application (v1.0.0) for BITS. It provides student exam interfaces, grading workflows, and submission management across iOS, Android, and web platforms.

## Architecture

### Core Stack

- **Framework**: React Native 0.76.9 with Expo ~52.0.46
- **Navigation**: React Navigation (6.x) with Native Stack, Bottom Tabs, Drawer, Material Top Tabs
- **UI**: React Native Paper, Expo Vector Icons, custom SVG support via react-native-svg-transformer
- **Styling**: Centralized via `GlobalStyles.js` containing font families, colors, sizes, spacing, and shadows

### Key Application Flow

**Entry Point**: `App.js`

1. Loads custom fonts (Inter family) via `expo-font`
2. Implements splash screen delay (1000ms)
3. Sets up Native Stack Navigator with `FrontPage` as initial route
4. Routes: FrontPage → SignIn (Content) → Checkout/Checkout1 → Root/Root1 (exam views) → Spherobeforeafter

### Directory Structure

- **`screens/`**: Main route components (FrontPage, SignIn, Checkout, Root, Spherobeforeafter, etc.)
- **`components/`**: Reusable UI components (ExamList, Button1, CommentsGrading, TopBar, StudentListSection, SubmissionDetail, ReviewArea, etc.)
- **`assets/`**: Fonts (Inter), SVGs, images - SVGs auto-validated by prestart script
- **`GlobalStyles.js`**: Single source of truth for all design tokens

## Critical Patterns & Conventions

### Design Token System (Must-Use in All Styling)

Import from `GlobalStyles.js` for consistency:

```javascript
import {
  Color,
  FontSize,
  Padding,
  Border,
  Gap,
  Height,
  Width,
  FontFamily,
  LineHeight,
  BoxShadow,
} from "../GlobalStyles";
```

- **Colors**: Use `Color.textDefaultDefault`, `Color.backgroundDefaultDefault`, `Color.colorDodgerblue`, etc.
- **Fonts**: Always use `FontFamily.interBold`, `FontFamily.interMedium`, etc. (custom fonts loaded at app start)
- **Spacing**: Use `Padding` and `Gap` constants for consistency (e.g., `padding_16`, `gap_8`)
- **Shadows**: Use `BoxShadow.shadow_drop` or `BoxShadow.buttonShadow` for elevation effects

### Component Structure Pattern

All components use inline StyleSheet with design tokens:

```javascript
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, Padding, Border } from "../GlobalStyles";

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.backgroundDefaultDefault,
    padding: Padding.padding_16,
    borderRadius: Border.br_8,
  },
  title: {
    fontSize: FontSize.fs_16,
    fontFamily: FontFamily.interBold,
    color: Color.textDefaultDefault,
  },
});

export default MyComponent;
```

### SVG Asset Handling

- SVGs stored in `assets/` and imported directly: `import MyIcon from "../assets/MyIcon.svg"`
- **Must run prestart validation**: `npm run prestart` validates and auto-fixes empty SVG files with minimal placeholder
- Transformer configured in `metro.config.js` to handle `.svg` as source extension
- Use `expo-image` for images (not `Image` from react-native) for better performance

### Navigation Patterns

- Route names map to component imports (e.g., route "Content" → `SignIn` component, "Button1" → `Root` component)
- Use `NavigationContainer` wrapper with `native-stack` for header-hidden screens
- Platform-specific handling for KeyboardAvoidingView: `behavior={Platform.OS === "ios" ? "padding" : undefined}`

### Build Pipeline

- **Prestart Hook**: Validates all SVGs before dev/build - fixes empty files automatically
- **Babel Config**: Uses babel-preset-expo with react-native-paper plugin and react-native-reanimated plugin
- **Metro**: Custom transformer for SVG support, filters out "svg" from assetExts

## Development Workflows

### Starting Development

```bash
npm install              # Install dependencies
npm run prestart        # Validate SVGs (runs before start)
npm start               # Launch Expo CLI
# Then: press 'a' (Android), 'i' (iOS), or 'w' (web)
```

### Platform-Specific Builds

```bash
npm run android         # Android emulator/device
npm run ios             # iOS simulator/device (macOS only)
npm run web             # Web browser
```

### Requirements

- **Node**: Minimum 23.x
- **iOS**: Requires macOS with Xcode
- **Android**: Android Studio emulator or physical device with USB debugging enabled
- **Web**: Requires additional packages (react-native-web@~0.19.13, @expo/metro-runtime@~4.0.1)

## Important Notes

### Avoiding Common Issues

1. **SVG Validation**: Always run `npm run prestart` after adding/removing SVGs to avoid build failures
2. **Font Loading**: Fonts must be loaded before rendering - `App.js` handles this with `useFonts` hook
3. **Web Support**: If web not needed, remove "web" from `app.json` platforms array to avoid web dependency warnings
4. **Design Consistency**: All colors, sizes, and spacing MUST come from `GlobalStyles.js` - hardcoded values break consistency

### Mobile Device Testing

- Android: Connect device via USB, enable developer options, and use ADB debugging
- iOS: Use Xcode simulator or physical device with Expo Go app
- Web: Direct browser testing via `npm run web`

## File Modification Guidelines

- Avoid directly editing screen routes in `App.js` - coordinate routing changes carefully
- When adding new screens: create in `screens/`, import in `App.js`, add Stack.Screen entry
- When adding new reusable components: place in `components/`, follow StyleSheet pattern from existing components
- Update `GlobalStyles.js` for any new design tokens needed (never hardcode colors/sizes)
