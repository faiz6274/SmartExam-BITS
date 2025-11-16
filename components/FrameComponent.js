import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import IconChevronLeft from "../assets/Icon-Chevron-Left.svg";
import {
  Gap,
  Width,
  Color,
  Padding,
  Height,
  LineHeight,
  FontFamily,
} from "../GlobalStyles";

const FrameComponent = () => {
  return (
    <View style={styles.frameParent}>
      <StatusBar />
      <View style={styles.header}>
        <IconChevronLeft
          style={styles.iconchevronLeft}
          width={Width.width_24}
          height={Height.height_24}
        />
        <Text style={styles.finalSubmission}>Final Submission</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    height: 74,
    zIndex: null,
    alignItems: "flex-end",
    gap: Gap.gap_11,
    width: Width.width_375,
  },
  header: {
    height: 42,
    backgroundColor: Color.backgroundDefaultDefault,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro200,
    borderBottomWidth: 0.5,
    overflow: "hidden",
    paddingHorizontal: Padding.padding_16,
    paddingVertical: 9,
    gap: 81,
    flexDirection: "row",
    width: Width.width_375,
  },
  iconchevronLeft: {
    width: Width.width_24,
    height: Height.height_24,
  },
  finalSubmission: {
    width: 137,
    fontSize: 17,
    letterSpacing: -0.3,
    lineHeight: LineHeight.lh_24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: "center",
    height: Height.height_24,
  },
});

export default FrameComponent;
