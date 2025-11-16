import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Exclude1 from "../assets/Exclude1.svg";
import Notch from "../assets/Notch.svg";
import Component from "../assets/";
import Component1 from "../assets/";
import Component2 from "../assets/";
import MobileSignal from "../assets/Mobile-Signal.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import ContentArea from "../components/ContentArea";
import StudentListSection from "../components/StudentListSection";
import SubmissionDetail from "../components/SubmissionDetail";
import CommentsGrading from "../components/CommentsGrading";
import { Height, Width, Color, Border } from "../GlobalStyles";

const Checkout = () => {
  return (
    <SafeAreaView style={styles.checkoutFlexBox}>
      <KeyboardAvoidingView
        style={styles.checkoutFlexBox}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={[styles.scrollview, styles.checkoutFlexBox]}
          contentContainerStyle={styles.checkoutScrollViewContent}
        >
          <View style={[styles.notch, styles.notchLayout]}>
            <View style={[styles.bg, styles.bgBg]} />
            <Exclude1
              style={styles.excludeIcon}
              width={378}
              height={Height.height_44}
            />
            <Notch
              style={[styles.notchIcon, styles.notchLayout]}
              width={Width.width_219}
              height={Height.height_30}
            />
          </View>
          <View style={[styles.wifi, styles.bgBg]}>
            <Component
              style={[styles.wifiPathIcon, styles.wifiIconClr]}
              width={Width.width_15_3}
              height={Height.height_4_74}
            />
            <Component1
              style={[styles.checkoutWifiPathIcon, styles.wifiIconClr]}
              width={Width.width_9_95}
              height={Height.height_3_63}
            />
            <Component2
              style={[styles.wifiPathIcon2, styles.wifiIconClr]}
              width={Width.width_4_63}
              height={Height.height_3_37}
            />
          </View>
          <MobileSignal
            style={styles.mobileSignalIcon}
            width={Width.width_17}
            height={Height.height_10_67}
          />
          <RecordingIndicator
            style={[styles.recordingIndicatorIcon, styles.recordingIconLayout]}
            width={Width.width_6}
            height={Height.height_6}
          />
          <View style={[styles.checkoutNotch, styles.notchLayout]}>
            <View style={[styles.bg, styles.bgBg]} />
            <Exclude1
              style={styles.excludeIcon}
              width={378}
              height={Height.height_44}
            />
            <Notch
              style={[styles.notchIcon, styles.notchLayout]}
              width={Width.width_219}
              height={Height.height_30}
            />
          </View>
          <RecordingIndicator
            style={[
              styles.checkoutRecordingIndicatorIcon,
              styles.recordingIconLayout,
            ]}
            width={Width.width_6}
            height={Height.height_6}
          />
          <ContentArea />
          <StudentListSection />
          <View style={styles.submissionArea}>
            <SubmissionDetail />
            <CommentsGrading />
          </View>
          <View style={styles.homeIndicator}>
            <View style={[styles.checkoutHomeIndicator, styles.bgBg]} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkoutScrollViewContent: {
    flexDirection: "column",
    paddingTop: 12,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 812,
    flex: 1,
  },
  checkoutFlexBox: {
    flex: 1,
    width: "100%",
  },
  notchLayout: {
    height: Height.height_30,
    width: Width.width_219,
  },
  bgBg: {
    backgroundColor: Color.colorBlack,
    position: "absolute",
  },
  wifiIconClr: {
    color: Color.colorGainsboro400,
    position: "absolute",
  },
  recordingIconLayout: {
    color: Color.colorDarkorange,
    height: Height.height_6,
    width: Width.width_6,
  },
  scrollview: {
    backgroundColor: Color.backgroundDefaultDefault,
    maxWidth: "100%",
  },
  notch: {
    zIndex: 1,
    display: "none",
  },
  bg: {
    top: 2,
    right: -80,
    bottom: -16,
    left: -79,
    display: "none",
  },
  excludeIcon: {
    width: 378,
    height: Height.height_44,
    display: "none",
  },
  notchIcon: {
    marginLeft: -109.5,
    left: "50%",
    color: Color.colorBlack,
    top: 0,
    position: "absolute",
  },
  wifi: {
    width: Width.width_15_27,
    height: Height.height_10_97,
    top: 17,
    right: 41,
  },
  wifiPathIcon: {
    width: Width.width_15_3,
    height: Height.height_4_74,
    right: 0,
    left: 0,
    overflow: "hidden",
    top: 0,
    maxWidth: "100%",
  },
  checkoutWifiPathIcon: {
    width: Width.width_9_95,
    height: Height.height_3_63,
    right: 3,
    bottom: 4,
    zIndex: 1,
  },
  wifiPathIcon2: {
    width: Width.width_4_63,
    height: Height.height_3_37,
    bottom: 0,
    left: 5,
  },
  mobileSignalIcon: {
    width: Width.width_17,
    height: Height.height_10_67,
    top: 18,
    right: 61,
    position: "absolute",
  },
  recordingIndicatorIcon: {
    zIndex: 4,
  },
  checkoutNotch: {
    zIndex: 5,
    display: "none",
  },
  checkoutRecordingIndicatorIcon: {
    zIndex: 6,
    marginTop: -6,
  },
  submissionArea: {
    width: Width.width_375,
    height: 419,
    marginTop: -6,
  },
  homeIndicator: {
    marginRight: -3,
    width: Width.width_378_09,
    height: Height.height_34,
    flexDirection: "row",
    marginTop: -6,
  },
  checkoutHomeIndicator: {
    height: Height.height_5,
    width: Width.width_134,
    bottom: 8,
    left: 122,
    borderRadius: Border.br_100,
  },
});

export default Checkout;
