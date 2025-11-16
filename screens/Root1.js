import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FrameComponent1 from "../components/FrameComponent1";
import { Height, Color, Width, Border } from "../GlobalStyles";

const Root1 = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  rootScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 812,
    flex: 1,
  },
  root: {
    width: "100%",
    flex: 1,
    maxWidth: "100%",
  },
  checkout: {
    height: Height.height_812,
    backgroundColor: Color.backgroundDefaultDefault,
    overflow: "hidden",
    gap: 566,
    width: Width.width_375,
  },
  homeIndicator: {
    height: Height.height_34,
    flexDirection: "row",
    width: Width.width_375,
  },
  homeIndicator2: {
    height: Height.height_5,
    width: Width.width_134,
    position: "absolute",
    right: 120,
    bottom: 8,
    borderRadius: Border.br_100,
    backgroundColor: Color.colorBlack,
  },
});

export default Root1;
