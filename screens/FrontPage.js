import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import View1 from "../components/View1";
import Exclude from "../assets/Exclude.svg";
import Notch from "../assets/Notch.svg";
import LeftSide from "../assets/Left-Side.svg";
import MobileSignal from "../assets/Mobile-Signal.svg";
import Wifi from "../assets/Wifi.svg";
import BatteryBody from "../assets/Battery-Body.svg";
import CombinedShape from "../assets/Combined-Shape.svg";
import BatteryTerminal from "../assets/Battery-Terminal.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import { Height, Width, Color, Padding, Gap, Border } from "../GlobalStyles";

const FrontPage = () => {
  return (
    <ScrollView
      style={styles.frontPage}
      contentContainerStyle={styles.frontPageScrollViewContent}
    >
      <View style={[styles.frontPageInner, styles.viewParentLayout]}>
        <View style={[styles.viewParent, styles.viewParentLayout]}>
          <View1 />
          <View style={styles.statusBar}>
            <View style={[styles.notch, styles.notchLayout]}>
              <View style={[styles.bg, styles.bgBg]} />
              <Exclude
                style={styles.excludeIcon}
                width={Width.width_375}
                height={Height.height_44}
              />
              <Notch
                style={[styles.notchIcon, styles.iconClr]}
                width={Width.width_219}
                height={Height.height_30}
              />
            </View>
            <LeftSide
              style={styles.leftSideIcon}
              width={Width.width_54}
              height={Height.height_21}
            />
            <View style={styles.rightSideWrapper}>
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
                    style={[styles.levelIcon, styles.iconClr]}
                    width={Width.width_22}
                    height={Height.height_11_33}
                  />
                  <CombinedShape
                    style={[styles.combinedShapeIcon, styles.iconClr]}
                    width={Width.width_1_33}
                    height={Height.height_4}
                  />
                  <BatteryTerminal
                    style={[styles.caseIcon, styles.iconClr]}
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
          <View style={styles.homeIndicator}>
            <View style={[styles.frontPageHomeIndicator, styles.bgBg]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frontPageScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 812,
    flex: 1,
  },
  viewParentLayout: {
    height: Height.height_812,
    width: Width.width_375,
  },
  notchLayout: {
    width: Width.width_219,
    height: Height.height_30,
  },
  bgBg: {
    backgroundColor: Color.colorBlack,
    position: "absolute",
  },
  iconClr: {
    color: Color.colorBlack,
    position: "absolute",
  },
  frontPage: {
    width: "100%",
    backgroundColor: Color.backgroundDefaultDefault,
    flex: 1,
    maxWidth: "100%",
  },
  frontPageInner: {
    flexDirection: "row",
    width: Width.width_375,
  },
  viewParent: {
    paddingTop: 250,
    gap: 218,
    width: Width.width_375,
  },
  statusBar: {
    left: 0,
    overflow: "hidden",
    alignItems: "flex-end",
    paddingLeft: Padding.padding_21,
    paddingTop: Padding.padding_12,
    paddingRight: Padding.padding_14_6,
    paddingBottom: Padding.padding_11,
    gap: Gap.gap_218_7,
    right: 0,
    top: 0,
    position: "absolute",
    height: Height.height_44,
    flexDirection: "row",
    width: Width.width_375,
  },
  notch: {
    display: "none",
  },
  bg: {
    right: -78,
    bottom: -16,
    left: -78,
    top: 2,
    display: "none",
  },
  excludeIcon: {
    display: "none",
    height: Height.height_44,
    width: Width.width_375,
  },
  notchIcon: {
    marginLeft: -109.5,
    left: "50%",
    width: Width.width_219,
    height: Height.height_30,
    top: 0,
  },
  leftSideIcon: {
    height: Height.height_21,
    width: Width.width_54,
  },
  rightSideWrapper: {
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
  levelIcon: {
    right: 2,
    borderRadius: Border.br_2_7,
    width: Width.width_22,
    height: Height.height_11_33,
    top: 0,
  },
  combinedShapeIcon: {
    top: 4,
    width: Width.width_1_33,
    height: Height.height_4,
    right: 0,
  },
  caseIcon: {
    right: 4,
    borderRadius: Border.br_1_3,
    width: Width.width_18,
    height: Height.height_7_33,
    zIndex: 1,
    top: 2,
  },
  recordingIndicatorIcon: {
    height: Height.height_6,
    width: Width.width_6,
    color: Color.colorDarkorange,
  },
  homeIndicator: {
    height: Height.height_34,
    flexDirection: "row",
    width: Width.width_375,
  },
  frontPageHomeIndicator: {
    height: Height.height_5,
    width: Width.width_134,
    right: 120,
    bottom: 8,
    borderRadius: Border.br_100,
  },
});

export default FrontPage;
