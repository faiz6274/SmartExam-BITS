import * as React from "react";
import { ScrollView, StyleSheet, View, Pressable, Text } from "react-native";
import FrameComponent from "../components/FrameComponent";
import Exclude from "../assets/Exclude.svg";
import Notch from "../assets/Notch.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import ReviewArea from "../components/ReviewArea";
import {
  Height,
  Width,
  Color,
  Padding,
  BoxShadow,
  Border,
  FontSize,
  LineHeight,
  FontFamily,
} from "../GlobalStyles";

const Checkout1 = () => {
  return (
    <ScrollView
      style={styles.checkout}
      contentContainerStyle={styles.checkoutScrollViewContent}
    >
      <FrameComponent />
      <View style={[styles.notch, styles.notchLayout]}>
        <View style={styles.bg} />
        <Exclude
          style={styles.excludeIcon}
          width={Width.width_375}
          height={Height.height_44}
        />
        <Notch
          style={[styles.notchIcon, styles.notchLayout]}
          width={Width.width_219}
          height={Height.height_30}
        />
      </View>
      <RecordingIndicator
        style={styles.recordingIndicatorIcon}
        width={Width.width_6}
        height={Height.height_6}
      />
      <View style={styles.answerReview}>
        <ReviewArea />
      </View>
      <View style={styles.submissionFooter}>
        <View style={styles.buttonArea}>
          <Pressable style={styles.button}>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </View>
        <View style={styles.homeIndicator}>
          <View style={styles.checkoutHomeIndicator} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkoutScrollViewContent: {
    flexDirection: "column",
    paddingTop: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 29,
    height: 812,
    flex: 1,
  },
  notchLayout: {
    height: Height.height_30,
    width: Width.width_219,
  },
  checkout: {
    width: "100%",
    backgroundColor: Color.backgroundDefaultDefault,
    flex: 1,
    maxWidth: "100%",
  },
  notch: {
    display: "none",
  },
  bg: {
    top: 2,
    right: -78,
    bottom: -16,
    left: -78,
    backgroundColor: Color.colorBlack,
    position: "absolute",
    display: "none",
  },
  excludeIcon: {
    height: Height.height_44,
    width: Width.width_375,
    display: "none",
  },
  notchIcon: {
    marginLeft: -109.5,
    top: 0,
    left: "50%",
    color: Color.colorBlack,
    position: "absolute",
  },
  recordingIndicatorIcon: {
    width: Width.width_6,
    height: Height.height_6,
    color: Color.colorDarkorange,
  },
  answerReview: {
    width: 316,
    height: 582,
    paddingLeft: Padding.padding_24,
    paddingBottom: 257,
    flexDirection: "row",
    zIndex: null,
  },
  submissionFooter: {
    height: 86,
    zIndex: null,
    width: Width.width_375,
  },
  buttonArea: {
    width: 359,
    height: 52,
    paddingLeft: Padding.padding_16,
    flexDirection: "row",
  },
  button: {
    width: 343,
    boxShadow: BoxShadow.buttonShadow,
    elevation: 2,
    borderRadius: Border.br_8,
    justifyContent: "center",
    paddingHorizontal: Padding.padding_24,
    paddingVertical: Padding.padding_14,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorBlack,
  },
  submit: {
    height: Height.height_24,
    width: 57,
    fontSize: FontSize.fs_16,
    lineHeight: LineHeight.lh_24,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.backgroundDefaultDefault,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  homeIndicator: {
    height: Height.height_34,
    flexDirection: "row",
    width: Width.width_375,
  },
  checkoutHomeIndicator: {
    height: Height.height_5,
    width: Width.width_134,
    right: 120,
    bottom: 8,
    borderRadius: Border.br_100,
    backgroundColor: Color.colorBlack,
    position: "absolute",
  },
});

export default Checkout1;
