import * as React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import FormForgotPassword from "../components/FormForgotPassword";
import Exclude from "../assets/Exclude.svg";
import Notch from "../assets/Notch.svg";
import LeftSide from "../assets/Left-Side.svg";
import MobileSignal from "../assets/Mobile-Signal.svg";
import Wifi from "../assets/Wifi.svg";
import BatteryBody from "../assets/Battery-Body.svg";
import CombinedShape from "../assets/Combined-Shape.svg";
import BatteryTerminal from "../assets/Battery-Terminal.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import {
  Height,
  Width,
  FontSize,
  Padding,
  Border,
  FontFamily,
  Color,
  Gap,
  LineHeight,
} from "../GlobalStyles";

const Root = () => {
  return (
    <SafeAreaView style={styles.rootFlexBox}>
      <KeyboardAvoidingView
        style={styles.rootFlexBox}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={[styles.scrollview, styles.rootFlexBox]}
          contentContainerStyle={styles.rootScrollViewContent}
        >
          <View style={[styles.page, styles.pageLayout]}>
            <View style={[styles.login, styles.loginFlexBox]}>
              <View style={styles.contentAreaParent}>
                <View style={styles.contentArea}>
                  <View style={styles.copyWrapper}>
                    <View style={styles.copy}>
                      <Text style={styles.login2}> Login</Text>
                      <Image
                        style={[
                          styles.aModernMinimalist2,
                          styles.notchIconPosition,
                        ]}
                        contentFit="cover"
                        source={require("../assets/A-modern-minimalist-2.png")}
                      />
                    </View>
                  </View>
                  <View style={styles.content}>
                    <View style={styles.inputButton}>
                      <TextInput
                        style={[styles.field, styles.fieldTypo]}
                        placeholder="email@domain.com"
                        multiline={false}
                        placeholderTextColor="#828282"
                      />
                      <TextInput
                        style={[styles.field, styles.fieldTypo]}
                        placeholder="password"
                        multiline={false}
                        placeholderTextColor="#828282"
                      />
                      <Pressable style={[styles.button, styles.fieldLayout]}>
                        <Text style={[styles.continue, styles.fieldTypo]}>
                          Continue
                        </Text>
                      </Pressable>
                    </View>
                    <Text
                      style={[
                        styles.byClickingContinueContainer,
                        styles.fieldTypo1,
                      ]}
                    >
                      <Text
                        style={styles.byClickingContinue}
                      >{`By clicking continue, you agree to our `}</Text>
                      <Text style={styles.termsOfService}>
                        Terms of Service
                      </Text>
                      <Text style={styles.byClickingContinue}>{` and `}</Text>
                      <Text style={styles.termsOfService}>Privacy Policy</Text>
                    </Text>
                  </View>
                </View>
                <FormForgotPassword />
              </View>
              <View style={styles.homeIndicator}>
                <View style={styles.homeIndicator2} />
              </View>
              <View style={[styles.statusBar, styles.statusBarPosition]}>
                <View style={[styles.notch, styles.notchLayout]}>
                  <View style={[styles.bg, styles.bgPosition]} />
                  <Exclude
                    style={[styles.excludeIcon, styles.statusBarLayout]}
                    width={Width.width_375}
                    height={Height.height_44}
                  />
                  <Notch
                    style={[styles.notchIcon, styles.notchLayout]}
                    width={Width.width_219}
                    height={Height.height_30}
                  />
                </View>
                <LeftSide
                  style={styles.leftSideIcon}
                  width={Width.width_54}
                  height={Height.height_21}
                />
                <View style={styles.statusIcons}>
                  <View style={styles.rightSide}>
                    <MobileSignal
                      style={styles.mobileSignalIcon}
                      width={Width.width_17}
                      height={Height.height_10_67}
                    />
                    <Wifi
                      style={styles.wifiIcon}
                      width={Width.width_15_27}
                      height={Height.height_10_97}
                    />
                    <View style={styles.battery}>
                      <BatteryBody
                        style={styles.batteryBodyIcon}
                        width={Width.width_22}
                        height={Height.height_11_33}
                      />
                      <CombinedShape
                        style={[
                          styles.combinedShapeIcon,
                          styles.statusBarPosition,
                        ]}
                        width={Width.width_1_33}
                        height={Height.height_4}
                      />
                      <BatteryTerminal
                        style={[styles.batteryTerminalIcon, styles.bgPosition]}
                        width={Width.width_18}
                        height={Height.height_7_33}
                      />
                    </View>
                    <RecordingIndicator
                      style={styles.recordingIndicatorIcon}
                      width={Width.width_6}
                      height={Height.height_6}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  rootFlexBox: {
    flex: 1,
    width: "100%",
  },
  pageLayout: {
    height: Height.height_812,
    width: Width.width_375,
  },
  loginFlexBox: {
    alignItems: "flex-end",
    overflow: "hidden",
  },
  notchIconPosition: {
    left: "50%",
    position: "absolute",
  },
  fieldTypo: {
    fontSize: FontSize.fs_14,
    alignItems: "center",
  },
  fieldLayout: {
    paddingHorizontal: Padding.padding_16,
    borderRadius: Border.br_8,
    height: Height.height_40,
    flexDirection: "row",
  },
  fieldTypo1: {
    fontFamily: FontFamily.interRegular,
    alignSelf: "stretch",
  },
  statusBarPosition: {
    right: 0,
    position: "absolute",
  },
  notchLayout: {
    width: Width.width_219,
    height: Height.height_30,
  },
  bgPosition: {
    top: 2,
    position: "absolute",
  },
  statusBarLayout: {
    height: Height.height_44,
    width: Width.width_375,
  },
  scrollview: {
    maxWidth: "100%",
  },
  page: {
    flexDirection: "row",
    width: Width.width_375,
  },
  login: {
    paddingTop: 276,
    gap: 109,
    justifyContent: "flex-end",
    backgroundColor: Color.backgroundDefaultDefault,
    width: Width.width_375,
    height: Height.height_812,
  },
  contentAreaParent: {
    height: 393,
    paddingLeft: 23,
    gap: 65,
    width: Width.width_374,
  },
  contentArea: {
    marginLeft: -23,
    height: 245,
    zIndex: 1,
    gap: 42,
    width: Width.width_374,
  },
  copyWrapper: {
    width: 210,
    paddingLeft: 163,
    height: Height.height_24,
    flexDirection: "row",
  },
  copy: {
    gap: Gap.gap_2,
    alignItems: "center",
  },
  login2: {
    width: 50,
    fontSize: FontSize.fs_16,
    lineHeight: LineHeight.lh_24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    zIndex: 0,
    textAlign: "center",
    color: Color.colorBlack,
    height: Height.height_24,
  },
  aModernMinimalist2: {
    width: 169,
    height: Height.height_169,
    marginLeft: -84.5,
    top: -168,
    zIndex: 1,
  },
  content: {
    height: 179,
    paddingHorizontal: Padding.padding_24,
    gap: Gap.gap_24,
    paddingVertical: Padding.padding_0,
    zIndex: 1,
    alignItems: "center",
    width: Width.width_374,
  },
  inputButton: {
    width: Width.width_327,
    gap: Gap.gap_16,
  },
  field: {
    borderStyle: "solid",
    borderColor: Color.colorGainsboro300,
    borderWidth: 1,
    paddingVertical: Padding.padding_8,
    fontFamily: FontFamily.interRegular,
    alignSelf: "stretch",
    paddingHorizontal: Padding.padding_16,
    borderRadius: Border.br_8,
    height: Height.height_40,
    flexDirection: "row",
    backgroundColor: Color.backgroundDefaultDefault,
    width: "100%",
    fontSize: FontSize.fs_14,
  },
  button: {
    justifyContent: "center",
    backgroundColor: Color.colorBlack,
    alignSelf: "stretch",
    paddingHorizontal: Padding.padding_16,
    borderRadius: Border.br_8,
    height: Height.height_40,
    paddingVertical: Padding.padding_0,
    alignItems: "center",
  },
  continue: {
    height: Height.height_20,
    width: Width.width_64,
    lineHeight: LineHeight.lh_20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.backgroundDefaultDefault,
    textAlign: "left",
    display: "flex",
  },
  byClickingContinueContainer: {
    fontSize: FontSize.fs_12,
    lineHeight: 18,
    textAlign: "center",
  },
  byClickingContinue: {
    color: Color.colorGray100,
  },
  termsOfService: {
    color: Color.colorBlack,
  },
  homeIndicator: {
    height: Height.height_34,
    flexDirection: "row",
    width: Width.width_375,
  },
  homeIndicator2: {
    height: Height.height_5,
    width: Width.width_134,
    right: 120,
    bottom: 8,
    borderRadius: Border.br_100,
    backgroundColor: Color.colorBlack,
    position: "absolute",
  },
  statusBar: {
    left: 0,
    paddingLeft: Padding.padding_21,
    paddingTop: Padding.padding_12,
    paddingRight: Padding.padding_14_6,
    paddingBottom: Padding.padding_11,
    gap: Gap.gap_218_7,
    top: 0,
    height: Height.height_44,
    width: Width.width_375,
    alignItems: "flex-end",
    overflow: "hidden",
    flexDirection: "row",
  },
  notch: {
    display: "none",
  },
  bg: {
    right: -78,
    bottom: -16,
    left: -78,
    display: "none",
    backgroundColor: Color.colorBlack,
  },
  excludeIcon: {
    display: "none",
  },
  notchIcon: {
    marginLeft: -109.5,
    top: 0,
    left: "50%",
    position: "absolute",
    color: Color.colorBlack,
  },
  leftSideIcon: {
    height: Height.height_21,
    width: Width.width_54,
  },
  statusIcons: {
    zIndex: null,
    width: Width.width_66_7,
    height: Height.height_15_7,
    paddingBottom: Padding.padding_4_4,
    justifyContent: "flex-end",
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
    top: 0,
    position: "absolute",
    color: Color.colorBlack,
  },
  combinedShapeIcon: {
    top: 4,
    width: Width.width_1_33,
    height: Height.height_4,
    color: Color.colorBlack,
  },
  batteryTerminalIcon: {
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
});

export default Root;
