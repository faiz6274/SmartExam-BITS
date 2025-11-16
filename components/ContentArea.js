import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import LeftSide1 from "../assets/Left-Side1.svg";
import MobileSignal from "../assets/Mobile-Signal.svg";
import Component3 from "../assets/";
import Component4 from "../assets/";
import Component5 from "../assets/";
import BatteryBody from "../assets/Battery-Body.svg";
import CombinedShape from "../assets/Combined-Shape.svg";
import BatteryTerminal from "../assets/Battery-Terminal.svg";
import {
  Padding,
  BoxShadow,
  FontFamily,
  FontSize,
  Height,
  Width,
  Color,
  Border,
  Gap,
} from "../GlobalStyles";

const ContentArea = () => {
  return (
    <View style={styles.contentArea}>
      <View style={[styles.feedbackContainer, styles.headerSpaceBlock]}>
        <Text
          style={[styles.feedbackSavedSuccessfully, styles.dashboardExamTypo]}
        >
          Feedback saved successfully
        </Text>
      </View>
      <View style={styles.studentInfoArea}>
        <View style={[styles.leftSideInfo, styles.leftIconLayout]}>
          <LeftSide1
            style={[styles.leftSideIcon, styles.leftIconLayout]}
            width={Width.width_54}
            height={Height.height_21}
          />
          <LeftSide1
            style={[styles.contentAreaLeftSideIcon, styles.leftIconLayout]}
            width={Width.width_54}
            height={Height.height_21}
          />
        </View>
        <View style={styles.rightSideInfo}>
          <View style={styles.mobileInfoContainer}>
            <MobileSignal
              style={styles.mobileSignalIcon}
              width={Width.width_17}
              height={Height.height_10_67}
            />
            <View style={styles.wifi}>
              <Component3
                style={[styles.wifiPathIcon, styles.wifiIconClr]}
                width={Width.width_15_3}
                height={Height.height_4_74}
              />
              <Component4
                style={[styles.contentAreaWifiPathIcon, styles.wifiIconClr]}
                width={Width.width_9_95}
                height={Height.height_3_63}
              />
              <Component5
                style={[styles.wifiPathIcon2, styles.wifiIconClr]}
                width={Width.width_4_63}
                height={Height.height_3_37}
              />
            </View>
            <View style={styles.batteryLayout}>
              <BatteryBody
                style={[styles.batteryLevelOne, styles.iconClr]}
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
              <View style={[styles.contentAreaBattery, styles.batteryLayout]}>
                <BatteryBody
                  style={[styles.batteryLevelOne, styles.iconClr]}
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
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.header, styles.headerSpaceBlock]}>
        <Text style={styles.smartexam}>SmartExam</Text>
        <Text style={[styles.dashboardExam, styles.dashboardExamTypo]}>
          Dashboard / Exam Name / Review
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSpaceBlock: {
    paddingVertical: Padding.padding_12,
    paddingHorizontal: Padding.padding_16,
    alignItems: "center",
    elevation: 3,
    boxShadow: BoxShadow.shadow_drop,
    left: 0,
    flexDirection: "row",
    overflow: "hidden",
    position: "absolute",
  },
  dashboardExamTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.fs_14,
    height: Height.height_17,
    textAlign: "left",
  },
  leftIconLayout: {
    width: Width.width_54,
    height: Height.height_21,
  },
  wifiIconClr: {
    color: Color.colorGainsboro400,
    position: "absolute",
  },
  iconClr: {
    color: Color.colorBlack,
    position: "absolute",
  },
  batteryLayout: {
    width: Width.width_24_33,
    height: Height.height_11_33,
  },
  contentArea: {
    width: Width.width_375,
    height: 123,
    marginTop: -6,
  },
  feedbackContainer: {
    top: 76,
    borderRadius: Border.br_8,
    backgroundColor: Color.colorHoneydew,
    height: 41,
    justifyContent: "center",
  },
  feedbackSavedSuccessfully: {
    width: 199,
    letterSpacing: -0.05,
    color: Color.colorTeal,
    textAlign: "left",
  },
  studentInfoArea: {
    left: 21,
    width: 342,
    alignItems: "flex-end",
    gap: 221,
    height: Height.height_21,
    zIndex: null,
    top: 0,
    flexDirection: "row",
    position: "absolute",
  },
  leftSideInfo: {
    zIndex: 1,
  },
  leftSideIcon: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  contentAreaLeftSideIcon: {
    zIndex: 1,
    top: 0,
    left: 0,
    position: "absolute",
  },
  rightSideInfo: {
    height: Height.height_15_7,
    justifyContent: "flex-end",
    paddingBottom: Padding.padding_4_4,
    width: 67,
    zIndex: null,
  },
  mobileInfoContainer: {
    height: 11,
    gap: Gap.gap_5,
    width: 67,
    zIndex: 1,
    flexDirection: "row",
  },
  mobileSignalIcon: {
    height: Height.height_10_67,
    width: Width.width_17,
    zIndex: 1,
  },
  wifi: {
    height: Height.height_10_97,
    width: Width.width_15_27,
    backgroundColor: Color.colorBlack,
    zIndex: 2,
  },
  wifiPathIcon: {
    width: Width.width_15_3,
    height: Height.height_4_74,
    maxWidth: "100%",
    right: 0,
    top: 0,
    left: 0,
    overflow: "hidden",
    color: Color.colorGainsboro400,
  },
  contentAreaWifiPathIcon: {
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
  batteryLevelOne: {
    right: 2,
    borderRadius: Border.br_2_7,
    width: Width.width_22,
    height: Height.height_11_33,
    color: Color.colorBlack,
    top: 0,
  },
  combinedShapeIcon: {
    top: 4,
    width: Width.width_1_33,
    height: Height.height_4,
    right: 0,
  },
  rectangleIcon: {
    top: 2,
    right: 4,
    borderRadius: Border.br_1_3,
    width: Width.width_18,
    height: Height.height_7_33,
    zIndex: 1,
  },
  contentAreaBattery: {
    zIndex: 2,
    top: 0,
    left: 0,
    position: "absolute",
  },
  header: {
    top: 20,
    backgroundColor: Color.backgroundDefaultDefault,
    width: Width.width_378_09,
    height: 56,
    gap: Gap.gap_16,
  },
  smartexam: {
    height: Height.height_24,
    width: 117,
    fontSize: FontSize.fs_20,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorGray300,
    textAlign: "left",
  },
  dashboardExam: {
    width: 229,
    color: Color.colorDimgray,
    textAlign: "left",
  },
});

export default ContentArea;
