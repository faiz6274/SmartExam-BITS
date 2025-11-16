import * as React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import AvatarAS from "../assets/AvatarAS.svg";
import {
  Gap,
  Padding,
  Border,
  Color,
  FontFamily,
  Height,
  FontSize,
  Width,
  BoxShadow,
} from "../GlobalStyles";

const StudentListSection = () => {
  return (
    <View style={styles.studentlistsection}>
      <TextInput
        style={styles.searchinput}
        placeholder="Search students"
        multiline={false}
        placeholderTextColor="#71717a"
      />
      <View style={[styles.studentitemactive, styles.studentitemFlexBox]}>
        <View style={styles.studentmeta}>
          <AvatarAS
            style={styles.avatarjdIcon}
            width={Width.width_32}
            height={Height.height_32}
          />
          <Text style={[styles.johnDoe, styles.johnDoeTypo]}>John Doe</Text>
        </View>
        <View
          style={[styles.statuspillpending, styles.statuspillpendingFlexBox]}
        >
          <Text style={[styles.pendingReview, styles.reviewedTypo]}>
            Pending Review
          </Text>
        </View>
      </View>
      <View style={[styles.studentitem, styles.studentitemFlexBox]}>
        <View style={styles.studentmeta}>
          <AvatarAS
            style={styles.avatarjdIcon}
            width={Width.width_32}
            height={Height.height_32}
          />
          <Text style={[styles.aliceSmith, styles.johnDoeTypo]}>
            Alice Smith
          </Text>
        </View>
        <View
          style={[styles.statuspillreviewed, styles.statuspillpendingFlexBox]}
        >
          <Text style={[styles.reviewed, styles.reviewedTypo]}>Reviewed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  studentitemFlexBox: {
    gap: Gap.gap_0,
    padding: Padding.padding_12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_8,
    overflow: "hidden",
  },
  johnDoeTypo: {
    textAlign: "left",
    color: Color.colorGray300,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    height: Height.height_17,
    fontSize: FontSize.fs_14,
  },
  statuspillpendingFlexBox: {
    paddingVertical: Padding.padding_4,
    paddingHorizontal: Padding.padding_8,
    justifyContent: "center",
    borderRadius: Border.br_16,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  reviewedTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.fs_12,
    height: Height.height_15,
    textAlign: "left",
  },
  studentlistsection: {
    marginRight: -3,
    marginBottom: 22,
    width: Width.width_378_09,
    height: 220,
    boxShadow: BoxShadow.shadow_drop,
    elevation: 3,
    borderRadius: Border.br_12,
    padding: Padding.padding_16,
    zIndex: 9,
    marginTop: -6,
    gap: Gap.gap_12,
    overflow: "hidden",
    backgroundColor: Color.backgroundDefaultDefault,
  },
  searchinput: {
    borderStyle: "solid",
    borderColor: Color.colorGainsboro100,
    borderWidth: 1,
    paddingHorizontal: Padding.padding_12,
    paddingVertical: Padding.padding_8,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.fs_14,
    borderRadius: Border.br_8,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  studentitemactive: {
    backgroundColor: Color.colorAliceblue,
  },
  studentmeta: {
    alignItems: "center",
    flexDirection: "row",
    gap: Gap.gap_12,
    overflow: "hidden",
  },
  avatarjdIcon: {
    height: Height.height_32,
    width: Width.width_32,
    color: Color.colorLightgray,
  },
  johnDoe: {
    width: 67,
  },
  statuspillpending: {
    backgroundColor: Color.colorLemonchiffon,
  },
  pendingReview: {
    width: Width.width_96,
    color: Color.colorSaddlebrown,
  },
  studentitem: {
    backgroundColor: Color.backgroundDefaultDefault,
    padding: Padding.padding_12,
    justifyContent: "space-between",
  },
  aliceSmith: {
    width: 79,
  },
  statuspillreviewed: {
    backgroundColor: Color.colorHoneydew,
  },
  reviewed: {
    width: Width.width_60,
    color: Color.colorTeal,
  },
});

export default StudentListSection;
