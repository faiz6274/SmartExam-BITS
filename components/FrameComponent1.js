import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Exclude1 from "../assets/Exclude1.svg";
import Notch from "../assets/Notch.svg";
import MobileSignal from "../assets/Mobile-Signal.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import IconChevronLeft from "../assets/Icon-Chevron-Left.svg";
import Upload from "./Upload";
import {
  Height,
  Width,
  FontFamily,
  FontSize,
  Gap,
  Padding,
  Color,
  Border,
  LineHeight,
} from "../GlobalStyles";

const FrameComponent1 = () => {
  return (
    <View style={styles.frameParent}>
      <View style={styles.frameGroup}>
        <View style={styles.statusBarParent}>
          <View style={[styles.statusBar, styles.statusBarLayout]}>
            <View style={[styles.notch, styles.notchLayout]}>
              <View style={styles.bg} />
              <Exclude1
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
            <View style={styles.rightStatusArea}>
              <View style={styles.rightSide}>
                <MobileSignal
                  style={styles.mobileSignalIcon}
                  width={Width.width_17}
                  height={Height.height_10_67}
                />
                <View style={styles.wifi}>
                  <Component9
                    style={[styles.wifiPathIcon, styles.iconPosition1]}
                    width={Width.width_15_3}
                    height={Height.height_4_74}
                  />
                  <Component10
                    style={[styles.wifiPathIcon2, styles.iconPosition]}
                    width={Width.width_9_95}
                    height={Height.height_3_63}
                  />
                  <Component11
                    style={styles.wifiPathIcon3}
                    width={Width.width_4_63}
                    height={Height.height_3_37}
                  />
                </View>
                <View style={styles.battery}>
                  <BatteryBody
                    style={styles.batteryBackgroundIcon}
                    width={Width.width_22}
                    height={Height.height_11_33}
                  />
                  <CombinedShape
                    style={[styles.combinedShapeIcon, styles.iconPosition1]}
                    width={Width.width_1_33}
                    height={Height.height_4}
                  />
                  <BatteryTerminal
                    style={[styles.batteryChargeIcon, styles.iconPosition]}
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
          <View style={styles.header}>
            <IconChevronLeft
              style={styles.iconchevronLeft}
              width={Width.width_24}
              height={Height.height_24}
            />
            <Text style={[styles.submission, styles.leftTypo1]}>
              Submission
            </Text>
          </View>
        </View>
        <View style={[styles.frameWrapper, styles.leftParentLayout]}>
          <View style={[styles.leftParent, styles.leftParentLayout]}>
            <Text style={[styles.left, styles.leftTypo]}>01:23:45 left</Text>
            <Text style={[styles.needHelp, styles.leftTypo]}>Need Help?</Text>
          </View>
        </View>
      </View>
      <View style={styles.uploadArea}>
        <Upload size={48} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarLayout: {
    height: Height.height_44,
    width: Width.width_375,
  },
  notchLayout: {
    width: Width.width_219,
    height: Height.height_30,
  },
  iconPosition1: {
    right: 0,
    position: "absolute",
  },
  iconPosition: {
    zIndex: 1,
    position: "absolute",
  },
  leftTypo1: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  leftParentLayout: {
    height: Height.height_17,
    flexDirection: "row",
    zIndex: null,
  },
  leftTypo: {
    textAlign: "left",
    fontSize: FontSize.fs_14,
    height: Height.height_17,
  },
  frameParent: {
    height: 212,
    gap: 47,
    zIndex: null,
    width: Width.width_375,
  },
  frameGroup: {
    height: 117,
    gap: Gap.gap_14,
    alignItems: "flex-end",
    zIndex: null,
    width: Width.width_375,
  },
  statusBarParent: {
    height: 86,
    zIndex: null,
    width: Width.width_375,
  },
  statusBar: {
    paddingLeft: Padding.padding_21,
    paddingTop: Padding.padding_12,
    paddingRight: Padding.padding_14_6,
    paddingBottom: Padding.padding_11,
    gap: Gap.gap_218_7,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "flex-end",
  },
  notch: {
    display: "none",
  },
  bg: {
    right: -78,
    bottom: -16,
    left: -78,
    backgroundColor: Color.colorBlack,
    top: 2,
    position: "absolute",
    display: "none",
  },
  excludeIcon: {
    display: "none",
  },
  notchIcon: {
    marginLeft: -109.5,
    left: "50%",
    color: Color.colorBlack,
    top: 0,
    position: "absolute",
  },
  rightStatusArea: {
    width: Width.width_66_7,
    height: Height.height_15_7,
    paddingBottom: Padding.padding_4_4,
    justifyContent: "flex-end",
    zIndex: null,
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
  wifi: {
    height: Height.height_10_97,
    width: Width.width_15_27,
    backgroundColor: Color.colorBlack,
  },
  wifiPathIcon: {
    width: Width.width_15_3,
    height: Height.height_4_74,
    left: 0,
    maxWidth: "100%",
    color: Color.colorGainsboro400,
    top: 0,
    overflow: "hidden",
  },
  wifiPathIcon2: {
    width: Width.width_9_95,
    height: Height.height_3_63,
    bottom: 4,
    left: 3,
    color: Color.colorGainsboro400,
  },
  wifiPathIcon3: {
    width: Width.width_4_63,
    height: Height.height_3_37,
    bottom: 0,
    left: 5,
    color: Color.colorGainsboro400,
    position: "absolute",
  },
  battery: {
    width: Width.width_24_33,
    height: Height.height_11_33,
  },
  batteryBackgroundIcon: {
    right: 2,
    borderRadius: Border.br_2_7,
    width: Width.width_22,
    height: Height.height_11_33,
    color: Color.colorBlack,
    top: 0,
    position: "absolute",
  },
  combinedShapeIcon: {
    top: 4,
    width: Width.width_1_33,
    height: Height.height_4,
    color: Color.colorBlack,
  },
  batteryChargeIcon: {
    right: 4,
    borderRadius: Border.br_1_3,
    width: Width.width_18,
    height: Height.height_7_33,
    color: Color.colorBlack,
    top: 2,
  },
  recordingIndicatorIcon: {
    height: Height.height_6,
    width: Width.width_6,
    color: Color.colorDarkorange,
  },
  header: {
    height: 42,
    backgroundColor: Color.backgroundDefaultDefault,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro200,
    borderBottomWidth: 0.5,
    paddingHorizontal: Padding.padding_16,
    paddingVertical: 9,
    gap: 102,
    flexDirection: "row",
    overflow: "hidden",
    width: Width.width_375,
  },
  iconchevronLeft: {
    width: Width.width_24,
    height: Height.height_24,
  },
  submission: {
    fontSize: 17,
    letterSpacing: -0.3,
    lineHeight: LineHeight.lh_24,
    textAlign: "center",
    width: Width.width_96,
    height: Height.height_24,
    color: Color.colorBlack,
  },
  frameWrapper: {
    width: 197,
    paddingRight: 27,
    justifyContent: "flex-end",
  },
  leftParent: {
    width: 170,
    gap: Gap.gap_2,
  },
  left: {
    width: Width.width_90,
    color: Color.colorGray300,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  needHelp: {
    width: 81,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDodgerblue,
  },
  uploadArea: {
    height: Height.height_48,
    paddingLeft: Padding.padding_48,
    width: Width.width_96,
    flexDirection: "row",
    zIndex: null,
  },
});

export default FrameComponent1;
