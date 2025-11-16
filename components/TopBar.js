import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import LeftSide from "../assets/Left-Side.svg";
import MobileSignal from "../assets/Mobile-Signal.svg";
import Wifi from "../assets/Wifi.svg";
import BatteryBody from "../assets/Battery-Body.svg";
import CombinedShape from "../assets/Combined-Shape.svg";
import BatteryTerminal from "../assets/Battery-Terminal.svg";
import RecordingIndicator from "../assets/Recording-Indicator.svg";
import Line from "../assets/Line.svg";
import Line2 from "../assets/Line2.svg";
import {
  Color,
  Height,
  Gap,
  Width,
  Padding,
  Border,
  FontSize,
  FontFamily,
} from "../GlobalStyles";

const TopBar = () => {
  return (
    <View style={styles.topBar}>
      <View style={[styles.timeArea, styles.timeAreaLayout]}>
        <View style={[styles.connectivityBar, styles.timeAreaLayout]}>
          <View style={styles.systemTray}>
            <LeftSide
              style={styles.leftSideIcon}
              width={Width.width_54}
              height={Height.height_21}
            />
            <View style={styles.rightSide}>
              <View style={styles.rightSide2}>
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
                    style={[styles.batteryLevelIcon, styles.iconClr]}
                    width={Width.width_22}
                    height={Height.height_11_33}
                  />
                  <CombinedShape
                    style={[styles.combinedShapeIcon, styles.iconClr]}
                    width={Width.width_1_33}
                    height={Height.height_4}
                  />
                  <BatteryTerminal
                    style={[styles.rectangleIcon, styles.iconClr]}
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
        <View style={styles.studentArea}>
          <View style={styles.studentAreaInner}>
            <View style={styles.lineParent}>
              <Line
                style={[styles.lineIcon, styles.lineIconPosition]}
                width={Width.width_17_8}
                height={Height.height_1_8}
              />
              <Line2
                style={[styles.lineIcon2, styles.lineIconPosition]}
                width={Width.width_14}
                height={Height.height_1_8}
              />
              <Line
                style={[styles.lineIcon3, styles.lineIconPosition]}
                width={Width.width_17_8}
                height={Height.height_1_8}
              />
            </View>
          </View>
          <Text style={styles.helloStudentName}>Hello, [Student Name]</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeAreaLayout: {
    width: 341,
    zIndex: null,
  },
  iconClr: {
    color: Color.colorBlack,
    position: "absolute",
  },
  lineIconPosition: {
    height: Height.height_1_8,
    left: 0,
    color: Color.colorBlack,
    position: "absolute",
  },
  topBar: {
    width: 352,
    paddingLeft: 11,
    flexDirection: "row",
    height: 75,
    zIndex: null,
  },
  timeArea: {
    gap: 25,
    height: 75,
  },
  connectivityBar: {
    paddingLeft: 1,
    height: Height.height_21,
    flexDirection: "row",
  },
  systemTray: {
    width: 339,
    alignItems: "flex-end",
    gap: Gap.gap_218_7,
    height: Height.height_21,
    flexDirection: "row",
    zIndex: null,
  },
  leftSideIcon: {
    width: Width.width_54,
    height: Height.height_21,
  },
  rightSide: {
    width: Width.width_66_7,
    height: Height.height_15_7,
    justifyContent: "flex-end",
    paddingBottom: Padding.padding_4_4,
    zIndex: null,
  },
  rightSide2: {
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
  batteryLevelIcon: {
    right: 2,
    borderRadius: Border.br_2_7,
    width: Width.width_22,
    top: 0,
    height: Height.height_11_33,
  },
  combinedShapeIcon: {
    top: 4,
    right: 0,
    width: Width.width_1_33,
    height: Height.height_4,
  },
  rectangleIcon: {
    top: 2,
    right: 4,
    borderRadius: Border.br_1_3,
    width: Width.width_18,
    height: Height.height_7_33,
    zIndex: 1,
  },
  recordingIndicatorIcon: {
    height: Height.height_6,
    width: Width.width_6,
    color: Color.colorDarkorange,
  },
  studentArea: {
    width: 311,
    gap: 36,
    height: 29,
    flexDirection: "row",
    zIndex: null,
  },
  studentAreaInner: {
    height: 21,
    paddingTop: 7,
    width: Width.width_17_8,
    zIndex: null,
  },
  lineParent: {
    height: 14,
    width: Width.width_17_8,
    zIndex: null,
  },
  lineIcon: {
    width: Width.width_17_8,
    top: 0,
  },
  lineIcon2: {
    top: 6,
    width: Width.width_14,
  },
  lineIcon3: {
    top: 12,
    width: Width.width_17_8,
  },
  helloStudentName: {
    width: 260,
    fontSize: FontSize.fs_24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray300,
    textAlign: "left",
    height: 29,
  },
});

export default TopBar;
