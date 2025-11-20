import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
    height: SCREEN_HEIGHT,
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
    width: SCREEN_WIDTH,
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
    width: SCREEN_WIDTH * 0.84,
    height: SCREEN_HEIGHT * 0.72,
    paddingLeft: Padding.padding_24,
    paddingBottom: SCREEN_HEIGHT * 0.32,
    flexDirection: "row",
    zIndex: null,
  },
  submissionFooter: {
    height: SCREEN_HEIGHT * 0.106,
    zIndex: null,
    width: SCREEN_WIDTH,
  },
  buttonArea: {
    width: SCREEN_WIDTH * 0.96,
    height: SCREEN_HEIGHT * 0.064,
    paddingLeft: Padding.padding_16,
    flexDirection: "row",
  },
  button: {
    width: "100%",
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
    fontSize: FontSize.fs_16,
    lineHeight: LineHeight.lh_24,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.backgroundDefaultDefault,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  homeIndicator: {
    height: Height.height_34,
    flexDirection: "row",
    width: SCREEN_WIDTH,
  },
  checkoutHomeIndicator: {
    height: Height.height_5,
    width: "30%",
    bottom: 8,
    alignSelf: "center",
    borderRadius: Border.br_100,
    backgroundColor: Color.colorBlack,
  },
});

export default Checkout1;
