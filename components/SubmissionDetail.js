import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import DownloadIcon from "../assets/Download-Icon.svg";
import {
  FontFamily,
  Width,
  BoxShadow,
  Border,
  Color,
  Padding,
  Gap,
  Height,
  FontSize,
} from "../GlobalStyles";

const SubmissionDetail = () => {
  return (
    <View style={styles.submissiondetail}>
      <View style={[styles.infobar, styles.infobarFlexBox]}>
        <Text style={[styles.johnDoe, styles.johnDoeTypo]}>John Doe</Text>
        <Text style={styles.submitted2hAgo}>Submitted 2h ago • 1.2 MB</Text>
      </View>
      <Pressable style={[styles.downloadbutton, styles.infobarFlexBox]}>
        <DownloadIcon
          style={styles.downloadIcon}
          width={Width.width_20}
          height={Height.height_20}
        />
        <Text style={[styles.downloadArchive, styles.johnDoeTypo]}>
          Download Archive
        </Text>
      </Pressable>
      <View style={styles.previewplaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  infobarFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  johnDoeTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  submissiondetail: {
    width: Width.width_378_09,
    height: 279,
    boxShadow: BoxShadow.shadow_drop,
    elevation: 3,
    borderRadius: Border.br_12,
    backgroundColor: Color.backgroundDefaultDefault,
    padding: Padding.padding_16,
    gap: Gap.gap_12,
    zIndex: 1,
    overflow: "hidden",
  },
  infobar: {
    justifyContent: "space-between",
    gap: Gap.gap_0,
  },
  johnDoe: {
    height: Height.height_19,
    width: 77,
    fontSize: FontSize.fs_16,
    color: Color.colorGray300,
    textAlign: "left",
  },
  submitted2hAgo: {
    height: Height.height_15,
    width: 155,
    fontSize: FontSize.fs_12,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray,
    textAlign: "left",
  },
  downloadbutton: {
    backgroundColor: Color.colorDodgerblue,
    justifyContent: "center",
    paddingHorizontal: Padding.padding_16,
    paddingVertical: Padding.padding_12,
    gap: Gap.gap_8,
    borderRadius: Border.br_8,
  },
  downloadIcon: {
    height: Height.height_20,
    width: Width.width_20,
  },
  downloadArchive: {
    height: Height.height_17,
    width: 126,
    fontSize: FontSize.fs_14,
    color: Color.backgroundDefaultDefault,
    textAlign: "left",
  },
  previewplaceholder: {
    width: Width.width_100,
    height: 160,
    backgroundColor: Color.colorAliceblue,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro100,
    borderWidth: 1,
    borderRadius: Border.br_8,
  },
});

export default SubmissionDetail;
