import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import {
  Color,
  Border,
  BoxShadow,
  Height,
  Width,
  FontSize,
  Padding,
  Gap,
  FontFamily,
} from "../GlobalStyles";

const ExamList = () => {
  return (
    <View style={styles.examList}>
      <View style={styles.examInstances}>
        <View
          style={[styles.examinfosectionParent, styles.examinfosectionLayout]}
        >
          <View
            style={[styles.examinfosection, styles.examinfosectionLayout]}
          />
          <View style={styles.examinfo}>
            <Text style={styles.examTitle}>Exam Title</Text>
            <Text
              style={[styles.dateTime, styles.dateTimeTypo]}
            >{`Date & Time`}</Text>
          </View>
          <Pressable style={styles.startbutton}>
            <Text style={[styles.upcoming, styles.dateTimeTypo]}>Upcoming</Text>
          </Pressable>
        </View>
        <View
          style={[styles.examinfosectionParent, styles.examinfosectionLayout]}
        >
          <View
            style={[styles.examinfosection, styles.examinfosectionLayout]}
          />
          <View style={styles.examinfo}>
            <Text style={styles.examTitle}>Exam Title</Text>
            <Text
              style={[styles.dateTime, styles.dateTimeTypo]}
            >{`Date & Time`}</Text>
          </View>
          <Pressable style={styles.startbutton}>
            <Text style={[styles.upcoming, styles.dateTimeTypo]}>Upcoming</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  examinfosectionLayout: {
    backgroundColor: Color.backgroundDefaultDefault,
    borderRadius: Border.br_12,
    elevation: 3,
    boxShadow: BoxShadow.shadow_drop,
    height: Height.height_91,
    width: Width.width_360,
  },
  dateTimeTypo: {
    fontSize: FontSize.fs_14,
    height: Height.height_17,
    textAlign: "left",
  },
  examList: {
    width: 366,
    justifyContent: "flex-end",
    paddingRight: 6,
    flexDirection: "row",
    height: 203,
    zIndex: null,
  },
  examInstances: {
    gap: 21,
    width: Width.width_360,
    height: 203,
    zIndex: null,
  },
  examinfosectionParent: {
    alignItems: "flex-end",
    paddingHorizontal: Padding.padding_28,
    paddingTop: Padding.padding_30,
    paddingBottom: Padding.padding_21,
    gap: 112,
    flexDirection: "row",
  },
  examinfosection: {
    display: "none",
    overflow: "hidden",
  },
  examinfo: {
    width: Width.width_100,
    gap: Gap.gap_4,
    overflow: "hidden",
  },
  examTitle: {
    height: Height.height_19,
    fontSize: FontSize.fs_16,
    color: Color.colorGray300,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: Width.width_84,
  },
  dateTime: {
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray,
    fontSize: FontSize.fs_14,
    height: Height.height_17,
    width: Width.width_84,
  },
  startbutton: {
    width: Width.width_80,
    borderRadius: Border.br_8,
    backgroundColor: Color.colorDodgerblue,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.padding_16,
    paddingVertical: Padding.padding_8,
    overflow: "hidden",
    flexDirection: "row",
  },
  upcoming: {
    width: 73,
    color: Color.backgroundDefaultDefault,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.fs_14,
    height: Height.height_17,
  },
});

export default ExamList;
