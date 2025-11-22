import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ScreenName = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.root}
          contentContainerStyle={styles.rootScrollViewContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>ScreenTitle</Text>
            <Text style={styles.subtitle}>Brief description or subtitle</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.bodyText}>
              Replace this content with your screen-specific components.
            </Text>
            {/* ...existing code... insert components here ...existing code... */}
          </View>

          <View style={styles.homeIndicatorWrapper}>
            <View style={styles.homeIndicator} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Color.backgroundDefaultDefault,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  root: {
    width: "100%",
  },
  rootScrollViewContent: {
    minHeight: SCREEN_HEIGHT,
    paddingHorizontal: Padding.padding_16,
    paddingVertical: Padding.padding_20,
    backgroundColor: Color.backgroundDefaultDefault,
  },
  header: {
    paddingTop: Padding.padding_16,
    paddingBottom: Padding.padding_12,
    gap: Gap.gap_8,
  },
  title: {
    fontSize: FontSize.fs_20,
    fontFamily: FontFamily.interBold,
    color: Color.textDefaultDefault,
    lineHeight: LineHeight.lh_24,
  },
  subtitle: {
    fontSize: FontSize.fs_14,
    fontFamily: FontFamily.interRegular,
    color: Color.textSecondDefault,
  },
  body: {
    marginTop: Padding.padding_12,
    backgroundColor: Color.backgroundDefaultDefault,
    borderRadius: Border.br_8,
    padding: Padding.padding_16,
    ...BoxShadow.shadow_drop,
  },
  bodyText: {
    fontSize: FontSize.fs_16,
    fontFamily: FontFamily.interRegular,
    color: Color.textDefaultDefault,
  },
  homeIndicatorWrapper: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: Gap.gap_20,
    marginBottom: Platform.OS === "ios" ? 12 : 8,
  },
  homeIndicator: {
    height: Height.height_5,
    width: "30%",
    borderRadius: Border.br_100,
    backgroundColor: Color.colorBlack,
  },
});

export default ScreenName;
