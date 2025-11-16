import * as React from "react";
import { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Checkbox } from "react-native-paper";
import {
  Color,
  Border,
  Height,
  FontSize,
  Width,
  BoxShadow,
  Padding,
  Gap,
  FontFamily,
} from "../GlobalStyles";

const CommentsGrading = () => {
  const [checkboxSquarechecked, setCheckboxSquarechecked] = useState(false);

  return (
    <View style={styles.commentsgrading}>
      <View style={[styles.feedbacktextarea, styles.scoreinputBorder]}>
        <Text style={styles.feedbackComments}>{`Feedback & Comments`}</Text>
      </View>
      <View style={[styles.scoreinput, styles.scoreinputFlexBox]}>
        <Text style={[styles.score, styles.scoreTypo]}>Score</Text>
      </View>
      <View style={[styles.reviewedcheckbox, styles.scoreinputFlexBox]}>
        <View style={styles.checkboxsquare}>
          <Checkbox
            status={checkboxSquarechecked ? "checked" : "unchecked"}
            onPress={() => setCheckboxSquarechecked(!checkboxSquarechecked)}
            color="#e5e7eb"
          />
        </View>
        <Text style={[styles.markAsReviewed, styles.scoreTypo]}>
          Mark as Reviewed
        </Text>
      </View>
      <Pressable style={[styles.savefeedbackbutton, styles.scoreinputFlexBox]}>
        <Text style={[styles.saveFeedback, styles.scoreTypo]}>
          Save Feedback
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreinputBorder: {
    borderWidth: 1,
    borderColor: Color.colorGainsboro100,
    borderStyle: "solid",
    borderRadius: Border.br_8,
  },
  scoreinputFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  scoreTypo: {
    height: Height.height_17,
    textAlign: "left",
    fontSize: FontSize.fs_14,
  },
  commentsgrading: {
    width: Width.width_378_09,
    height: 152,
    boxShadow: BoxShadow.shadow_drop,
    elevation: 3,
    borderRadius: Border.br_12,
    backgroundColor: Color.backgroundDefaultDefault,
    padding: Padding.padding_16,
    gap: Gap.gap_12,
    zIndex: 2,
    marginTop: -12,
    overflow: "hidden",
  },
  feedbacktextarea: {
    alignSelf: "stretch",
    padding: Padding.padding_12,
    height: 16,
    borderColor: Color.colorGainsboro100,
    borderStyle: "solid",
    overflow: "hidden",
  },
  feedbackComments: {
    width: 156,
    height: Height.height_1,
    letterSpacing: -0.01,
    textAlign: "left",
    fontSize: FontSize.fs_14,
    color: Color.colorDimgray,
    fontFamily: FontFamily.interRegular,
  },
  scoreinput: {
    paddingHorizontal: Padding.padding_12,
    paddingVertical: Padding.padding_8,
    borderWidth: 1,
    borderColor: Color.colorGainsboro100,
    borderStyle: "solid",
    borderRadius: Border.br_8,
  },
  score: {
    width: 42,
    color: Color.colorDimgray,
    fontFamily: FontFamily.interRegular,
    height: Height.height_17,
  },
  reviewedcheckbox: {
    gap: Gap.gap_8,
  },
  checkboxsquare: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    transform: "scale(NaN)",
  },
  markAsReviewed: {
    width: Width.width_125,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorGray300,
  },
  savefeedbackbutton: {
    backgroundColor: Color.colorDodgerblue,
    justifyContent: "center",
    paddingHorizontal: Padding.padding_20,
    paddingVertical: Padding.padding_0,
    borderRadius: Border.br_8,
    alignItems: "center",
    flexDirection: "row",
    height: 16,
  },
  saveFeedback: {
    width: 106,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.backgroundDefaultDefault,
  },
});

export default CommentsGrading;
