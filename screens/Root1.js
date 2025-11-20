import * as React from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FrameComponent1 from "../components/FrameComponent1";
import { Height, Color, Width, Border } from "../GlobalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Root1 = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.rootScrollViewContent}
      >
        <View style={styles.checkout}>
          <FrameComponent1 />
          <View style={styles.homeIndicator}>
            <View style={styles.homeIndicator2} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: SCREEN_HEIGHT, // responsive
    flex: 1,
  },
  root: {
    width: "100%",
    flex: 1,
    maxWidth: "100%",
  },
  safe: {
    flex: 1,
    backgroundColor: Color.backgroundDefaultDefault,
  },
  checkout: {
    minHeight: SCREEN_HEIGHT, // responsive container height
    backgroundColor: Color.backgroundDefaultDefault,
    overflow: "hidden",
    gap: 0,
    width: SCREEN_WIDTH, // responsive width
  },
  homeIndicator: {
    height: Height.height_34,
    flexDirection: "row",
    width: SCREEN_WIDTH, // responsive
    alignItems: "flex-end",
    justifyContent: "center",
  },
  homeIndicator2: {
    height: Height.height_5,
    width: "30%", // percentage-based
    borderRadius: Border.br_100,
    marginBottom: 8,
    backgroundColor: Color.colorBlack,
  },
});

export default Root1;
