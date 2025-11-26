import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
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
import { Image } from "expo-image";
import Exclude from "../assets/Exclude.svg";
import Notch from "../assets/Notch.svg";
import LeftSide from "../assets/Left-Side.svg";
import MobileSignal from "../assets/Mobile-Signal.svg";
import Wifi from "../assets/Wifi.svg";
import BatteryBody from "../assets/Battery-Body.svg";
import CombinedShape from "../assets/Combined-Shape.svg";
import BatteryTerminal from "../assets/Battery-Terminal.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import Content from "../components/Content";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SignIn = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Image
            style={styles.aModernMinimalist3}
            contentFit="cover"
            source={require("../assets/A-modern-minimalist-2.png")}
          />
          <View style={styles.copy}>
            <Text style={styles.createAccount}>Create account</Text>
          </View>
          <Content />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.backgroundDefaultDefault,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    width: SCREEN_WIDTH, // ✅ Responsive
    minHeight: SCREEN_HEIGHT, // ✅ Responsive
    paddingHorizontal: Padding.padding_16,
    paddingBottom: Padding.padding_20,
    justifyContent: "center",
  },
  signInScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 49,
    height: 812,
    flex: 1,
  },
  statusBarLayout: {
    height: Height.height_44,
    width: Width.width_375,
  },
  notchLayout: {
    width: Width.width_219,
    height: Height.height_30,
  },
  bgPosition: {
    top: 2,
    position: "absolute",
  },
  iconPosition: {
    top: 0,
    color: Color.colorBlack,
    position: "absolute",
  },
  statusBar: {
    overflow: "hidden",
    alignItems: "flex-end",
    paddingLeft: Padding.padding_21,
    paddingTop: Padding.padding_12,
    paddingRight: Padding.padding_14_6,
    paddingBottom: Padding.padding_11,
    gap: Gap.gap_218_7,
    flexDirection: "row",
  },
  notch: {
    display: "none",
  },
  bg: {
    right: -78,
    bottom: -16,
    left: -78,
    backgroundColor: Color.colorBlack,
    display: "none",
  },
  excludeIcon: {
    display: "none",
  },
  notchIcon: {
    marginLeft: -109.5,
    left: "50%",
    color: Color.colorBlack,
    width: Width.width_219,
    height: Height.height_30,
  },
  leftSideIcon: {
    height: Height.height_21,
    width: Width.width_54,
  },
  statusBarComponents: {
    zIndex: null,
    width: Width.width_66_7,
    height: Height.height_15_7,
    justifyContent: "flex-end",
    paddingBottom: Padding.padding_4_4,
  },
  rightSide: {
    width: Width.width_66_66,
    height: Height.height_11_34,
    gap: Gap.gap_5,
    flexDirection: "row",
  },
  mobileSignalIcon: {
    height: Height.height_10_67,
    width: Width.width_17,
  },
  wifiIcon: {
    height: Height.height_10_97,
    width: Width.width_15_27,
  },
  battery: {
    width: Width.width_24_33,
    height: Height.height_11_33,
  },
  batteryBodyIcon: {
    right: 2,
    borderRadius: Border.br_2_7,
    width: Width.width_22,
    height: Height.height_11_33,
    color: Color.colorBlack,
  },
  combinedShapeIcon: {
    top: 4,
    right: 0,
    width: Width.width_1_33,
    height: Height.height_4,
    color: Color.colorBlack,
    position: "absolute",
  },
  batteryCapIcon: {
    right: 4,
    borderRadius: Border.br_1_3,
    width: Width.width_18,
    height: Height.height_7_33,
    zIndex: 1,
    color: Color.colorBlack,
  },
  recordingIndicatorIcon: {
    height: Height.height_6,
    width: Width.width_6,
    color: Color.colorDarkorange,
  },
  aModernMinimalist3: {
    width: 169,
    height: Height.height_169,
  },
  copy: {
    alignItems: "center",
  },
  createAccount: {
    width: 122,
    height: Height.height_24,
    fontSize: FontSize.fs_16,
    lineHeight: LineHeight.lh_24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    color: Color.colorBlack,
  },
  homeIndicator: {
    height: Height.height_34,
    paddingLeft: 121,
    paddingTop: Padding.padding_21,
    paddingRight: 120,
    paddingBottom: Padding.padding_8,
    flexDirection: "row",
    width: Width.width_375,
  },
  signInHomeIndicator: {
    height: Height.height_5,
    width: Width.width_134,
    borderRadius: Border.br_100,
    backgroundColor: Color.colorBlack,
  },
});

export default SignIn;
