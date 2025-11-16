import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Morehoriz from "../assets/more-horiz.svg";
import {
  Gap,
  Padding,
  Color,
  FontFamily,
  Width,
  Height,
  FontSize,
} from "../GlobalStyles";

const ReviewArea = () => {
  return (
    <View style={[styles.reviewArea, styles.reviewCommon]}>
      <View
        style={[
          styles.reviewYouAnswersBeforeTheWrapper,
          styles.questionTwoSpaceBlock,
        ]}
      >
        <Text style={[styles.reviewYouAnswers, styles.q1Typo]}>
          Review You Answers before the final submission.
        </Text>
      </View>
      <View style={styles.questionArea}>
        <View style={[styles.questionOneParent, styles.responseAreaLayout]}>
          <View style={styles.questionOne}>
            <Image
              style={styles.fileIcon}
              contentFit="cover"
              source={require("../assets/File1.png")}
            />
            <View style={[styles.questionTwo, styles.questionTwoSpaceBlock]}>
              <Text style={[styles.q1, styles.q1Typo]}>Q1</Text>
            </View>
          </View>
          <View style={[styles.responseArea, styles.responseAreaLayout]}>
            <Image
              style={styles.fileIcon}
              contentFit="cover"
              source={require("../assets/File1.png")}
            />
            <View style={styles.qualityArea}>
              <Text style={[styles.q1, styles.q1Typo]}>Q2</Text>
            </View>
          </View>
          <View style={[styles.reviewAreaQuestionOne, styles.reviewCommon]}>
            <Image
              style={styles.fileIcon}
              contentFit="cover"
              source={require("../assets/File1.png")}
            />
            <View style={styles.q3Wrapper}>
              <Text style={[styles.q1, styles.q1Typo]}>Q3</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionItems}>
          <View style={styles.fileWrapper}>
            <Image
              style={styles.fileIcon}
              contentFit="cover"
              source={require("../assets/File1.png")}
            />
          </View>
          <Image
            style={styles.fileIcon}
            contentFit="cover"
            source={require("../assets/File1.png")}
          />
          <View style={styles.fileParent}>
            <Image
              style={styles.fileIcon}
              contentFit="cover"
              source={require("../assets/File1.png")}
            />
            <Morehoriz
              style={styles.moreHorizIcon}
              width={Width.width_24}
              height={Height.height_24}
            />
          </View>
        </View>
      </View>
      <View style={[styles.multipleQuality, styles.questionTwoSpaceBlock]}>
        <View style={styles.qualityOptionSet}>
          <Text style={[styles.q1, styles.q1Typo]}>Q4</Text>
          <Text style={[styles.q1, styles.q1Typo]}>Q5</Text>
          <Text style={[styles.q1, styles.q1Typo]}>Q6</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCommon: {
    gap: Gap.gap_19,
    zIndex: null,
  },
  questionTwoSpaceBlock: {
    paddingLeft: Padding.padding_16,
    flexDirection: "row",
    zIndex: null,
  },
  q1Typo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  responseAreaLayout: {
    height: 125,
    zIndex: null,
  },
  reviewArea: {
    height: 325,
    width: Width.width_292,
  },
  reviewYouAnswersBeforeTheWrapper: {
    width: 285,
    height: Height.height_44,
    paddingBottom: 7,
  },
  reviewYouAnswers: {
    height: 37,
    width: 269,
    fontSize: FontSize.fs_16,
  },
  questionArea: {
    height: 228,
    gap: 13,
    zIndex: null,
    width: Width.width_292,
  },
  questionOneParent: {
    gap: 7,
    flexDirection: "row",
    width: Width.width_292,
  },
  questionOne: {
    height: 123,
    gap: Gap.gap_18,
    width: Width.width_90,
    zIndex: null,
  },
  fileIcon: {
    height: Height.height_90,
    width: Width.width_90,
  },
  questionTwo: {
    width: 76,
    height: Height.height_15,
  },
  q1: {
    width: Width.width_63,
    fontSize: FontSize.fs_14,
    height: Height.height_15,
  },
  responseArea: {
    width: 98,
    paddingRight: Padding.padding_8,
    gap: Gap.gap_20,
  },
  qualityArea: {
    width: 82,
    paddingLeft: Padding.padding_22,
    height: Height.height_15,
    flexDirection: "row",
    zIndex: null,
  },
  reviewAreaQuestionOne: {
    height: 124,
    width: Width.width_90,
  },
  q3Wrapper: {
    width: Width.width_80,
    paddingLeft: Padding.padding_20,
    height: Height.height_15,
    flexDirection: "row",
    zIndex: null,
  },
  actionItems: {
    gap: Gap.gap_8,
    height: Height.height_90,
    flexDirection: "row",
    zIndex: null,
    width: Width.width_292,
  },
  fileWrapper: {
    width: Width.width_96,
    paddingRight: Padding.padding_6,
    height: Height.height_90,
    zIndex: null,
  },
  fileParent: {
    zIndex: 1,
    height: Height.height_90,
    width: Width.width_90,
    flexDirection: "row",
  },
  moreHorizIcon: {
    height: Height.height_24,
    width: Width.width_24,
    position: "absolute",
    right: -23,
    bottom: 26,
    color: Color.colorGray200,
    zIndex: 1,
  },
  multipleQuality: {
    width: 278,
    height: Height.height_15,
  },
  qualityOptionSet: {
    width: 262,
    gap: 38,
    height: Height.height_15,
    flexDirection: "row",
    zIndex: null,
  },
});

export default ReviewArea;
