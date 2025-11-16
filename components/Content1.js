import * as React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Component6 from "../assets/";
import Component7 from "../assets/";
import Component8 from "../assets/";
import Frame from "../assets/Frame.svg";
import {
  Height,
  Color,
  Padding,
  FontSize,
  Border,
  Width,
  Gap,
  LineHeight,
  FontFamily,
} from "../GlobalStyles";

const Content1 = () => {
  return (
    <View style={styles.content}>
      <View style={[styles.actionBar, styles.actionFlexBox]}>
        <View style={[styles.actionButtons, styles.actionFlexBox]}>
          <View style={styles.actionButton}>
            <View style={styles.subtract}>
              <View style={styles.compoundShape}>
                <View style={[styles.union, styles.unionPosition]}>
                  <Component6
                    style={[styles.vectorIcon, styles.vectorIconLayout]}
                  />
                  <Component7
                    style={[styles.vectorStrokeIcon, styles.vectorIconLayout]}
                  />
                </View>
                <Component8
                  style={styles.compoundShapeChild}
                  width={Width.width_6}
                  height={Height.height_11}
                />
              </View>
            </View>
          </View>
          <View style={[styles.pill, styles.pillFlexBox]}>
            <Text style={styles.dashboard}>Dashboard</Text>
          </View>
        </View>
      </View>
      <View style={styles.activityOverviewParent}>
        <View style={[styles.activityOverview, styles.frameWrapperSpaceBlock]}>
          <View style={[styles.scorerow, styles.pillFlexBox]}>
            <Text style={[styles.overallScore, styles.scoreTypo]}>
              Overall Score
            </Text>
            <Text style={[styles.scoreUnit, styles.scoreTypo]}>85%</Text>
          </View>
        </View>
        <View style={styles.scoreProgress}>
          <View style={[styles.progressbar, styles.rectangleLayout]}>
            <View style={[styles.rectangle, styles.rectangleLayout]} />
          </View>
        </View>
        <View style={[styles.frameWrapper, styles.frameWrapperSpaceBlock]}>
          <Frame
            style={styles.frameIcon}
            width={Width.width_24}
            height={Height.height_24}
          />
        </View>
        <TextInput
          style={styles.searchinput}
          placeholder="Search activity"
          multiline={false}
          placeholderTextColor="#71717a"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionFlexBox: {
    flexDirection: "row",
    height: Height.height_32,
  },
  unionPosition: {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
  },
  vectorIconLayout: {
    color: Color.colorBlack,
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  pillFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameWrapperSpaceBlock: {
    paddingLeft: Padding.padding_15,
    flexDirection: "row",
  },
  scoreTypo: {
    fontSize: FontSize.fs_16,
    height: Height.height_19,
    textAlign: "left",
  },
  rectangleLayout: {
    backgroundColor: Color.colorDodgerblue,
    borderRadius: Border.br_4,
    width: Width.width_292,
    height: Height.height_8,
  },
  content: {
    height: 187,
    paddingBottom: Padding.padding_5,
    gap: 29,
    zIndex: null,
    width: 346,
  },
  actionBar: {
    width: 156,
    paddingLeft: Padding.padding_10,
    zIndex: null,
  },
  actionButtons: {
    width: 146,
    zIndex: 1,
    gap: Gap.gap_24,
  },
  actionButton: {
    paddingTop: Padding.padding_2,
    height: Height.height_24,
    width: Width.width_20,
  },
  subtract: {
    backgroundColor: Color.colorBlack,
    height: Height.height_22,
    width: Width.width_20,
    flexDirection: "row",
  },
  compoundShape: {
    zIndex: 2,
    height: Height.height_22,
    width: Width.width_20,
  },
  union: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    backgroundColor: Color.colorBlack,
    height: Height.height_22,
    width: Width.width_20,
  },
  vectorIcon: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  },
  vectorStrokeIcon: {
    zIndex: 1,
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
  },
  compoundShapeChild: {
    width: Width.width_6,
    height: Height.height_11,
    marginLeft: -3,
    left: "50%",
    zIndex: 2,
    color: Color.backgroundDefaultDefault,
    bottom: 0,
    position: "absolute",
  },
  pill: {
    borderRadius: Border.br_20,
    backgroundColor: Color.iconIconDefault,
    justifyContent: "center",
    paddingHorizontal: Padding.padding_14,
    paddingVertical: Padding.padding_6,
    zIndex: 1,
  },
  dashboard: {
    height: Height.height_20,
    width: 77,
    lineHeight: LineHeight.lh_20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    display: "flex",
    textAlign: "left",
    fontSize: FontSize.fs_14,
    alignItems: "center",
    color: Color.backgroundDefaultDefault,
  },
  activityOverviewParent: {
    height: 121,
    gap: 11,
    width: 346,
  },
  activityOverview: {
    width: 154,
    height: Height.height_19,
    paddingLeft: Padding.padding_15,
  },
  scorerow: {
    justifyContent: "space-between",
    gap: Gap.gap_0,
    overflow: "hidden",
    alignItems: "center",
  },
  overallScore: {
    width: 107,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray300,
  },
  scoreUnit: {
    width: 38,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorDodgerblue,
  },
  scoreProgress: {
    width: 307,
    height: Height.height_8,
    paddingLeft: Padding.padding_15,
    flexDirection: "row",
  },
  progressbar: {
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  rectangle: {
    display: "none",
  },
  frameWrapper: {
    width: 39,
    height: Height.height_24,
    zIndex: null,
  },
  frameIcon: {
    width: Width.width_24,
    height: Height.height_24,
  },
  searchinput: {
    borderRadius: Border.br_8,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro100,
    borderWidth: 1,
    paddingHorizontal: Padding.padding_12,
    paddingVertical: Padding.padding_8,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.fs_14,
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    width: 346,
  },
});

export default Content1;
