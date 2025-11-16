import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Exclude from "../assets/Exclude.svg";
import Notch from "../assets/Notch.svg";
import TopBar from "../components/TopBar";
import Content1 from "../components/Content1";
import ExamList from "../components/ExamList";
import {
  Color,
  Border,
  Height,
  Width,
  FontSize,
  Padding,
  Gap,
  FontFamily,
  BoxShadow,
} from "../GlobalStyles";

const Spherobeforeafter = () => {
  return (
    <SafeAreaView style={styles.scrollviewFlexBox}>
      <KeyboardAvoidingView
        style={styles.scrollviewFlexBox}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={[styles.scrollview, styles.scrollviewFlexBox]}
          contentContainerStyle={styles.spherobeforeafterScrollViewContent}
        >
          <View style={[styles.dashboard, styles.dashboardBg]}>
            <View style={[styles.homeIndicator, styles.homeLayout]}>
              <View
                style={[
                  styles.spherobeforeafterHomeIndicator,
                  styles.examinfosectionPosition,
                ]}
              />
            </View>
            <View style={[styles.notch, styles.notchLayout]}>
              <View style={styles.bg} />
              <Exclude
                style={styles.excludeIcon}
                width={Width.width_375}
                height={Height.height_44}
              />
              <Notch
                style={[styles.notchIcon, styles.notchLayout]}
                width={Width.width_219}
                height={Height.height_30}
              />
            </View>
            <View style={styles.iconsearch} />
            <View style={styles.statusArea}>
              <TopBar />
              <Content1 />
              <View style={[styles.upcomingExams, styles.examPreviewLayout]}>
                <View style={[styles.examPreview, styles.examPreviewLayout]}>
                  <View style={styles.examinfo}>
                    <Text style={styles.examTitle}>Exam Title</Text>
                    <Text
                      style={[styles.dateTime, styles.uploadTypo]}
                    >{`Date & Time`}</Text>
                  </View>
                  <Pressable style={styles.startbutton}>
                    <Text style={[styles.upload, styles.uploadTypo]}>
                      Upload
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View
              style={[styles.examinfosection, styles.examinfosectionPosition]}
            />
            <ExamList />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spherobeforeafterScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 812,
    flex: 1,
  },
  scrollviewFlexBox: {
    flex: 1,
    width: "100%",
  },
  dashboardBg: {
    backgroundColor: Color.backgroundDefaultDefault,
    overflow: "hidden",
  },
  homeLayout: {
    borderRadius: Border.br_100,
    height: Height.height_5,
    width: Width.width_134,
    backgroundColor: Color.colorBlack,
  },
  examinfosectionPosition: {
    left: 0,
    position: "absolute",
  },
  notchLayout: {
    height: Height.height_30,
    width: Width.width_219,
  },
  examPreviewLayout: {
    height: Height.height_40,
    flexDirection: "row",
  },
  uploadTypo: {
    fontSize: FontSize.fs_14,
    height: Height.height_17,
    textAlign: "left",
  },
  scrollview: {
    maxWidth: "100%",
  },
  dashboard: {
    height: Height.height_812,
    paddingTop: 17,
    paddingRight: 8,
    paddingBottom: 179,
    gap: 41,
    alignItems: "flex-end",
    overflow: "hidden",
    width: Width.width_375,
  },
  homeIndicator: {
    marginLeft: -59.5,
    bottom: 3,
    flexDirection: "row",
    backgroundColor: Color.colorBlack,
    left: "50%",
    position: "absolute",
  },
  spherobeforeafterHomeIndicator: {
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: Color.colorBlack,
    borderRadius: Border.br_100,
    height: Height.height_5,
    width: Width.width_134,
  },
  notch: {
    zIndex: 1,
    display: "none",
  },
  bg: {
    top: 2,
    right: -78,
    bottom: -16,
    left: -78,
    display: "none",
    backgroundColor: Color.colorBlack,
    position: "absolute",
  },
  excludeIcon: {
    height: Height.height_44,
    display: "none",
    width: Width.width_375,
  },
  notchIcon: {
    marginLeft: -109.5,
    color: Color.colorBlack,
    top: 0,
    left: "50%",
    position: "absolute",
  },
  iconsearch: {
    width: Width.width_24,
    height: Height.height_24,
    zIndex: 2,
    display: "none",
    overflow: "hidden",
  },
  statusArea: {
    width: 352,
    height: 372,
    gap: 35,
    zIndex: null,
  },
  upcomingExams: {
    width: 306,
    paddingLeft: Padding.padding_11,
    zIndex: null,
  },
  examPreview: {
    width: 295,
    gap: 128,
    alignItems: "flex-end",
  },
  examinfo: {
    width: 103,
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
    height: Height.height_17,
    width: Width.width_84,
  },
  startbutton: {
    width: 63,
    borderRadius: Border.br_8,
    backgroundColor: Color.colorDodgerblue,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.padding_16,
    paddingVertical: Padding.padding_8,
    flexDirection: "row",
    overflow: "hidden",
  },
  upload: {
    width: 52,
    color: Color.backgroundDefaultDefault,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: Height.height_17,
  },
  examinfosection: {
    width: Width.width_360,
    height: Height.height_91,
    top: 318,
    boxShadow: BoxShadow.shadow_drop,
    elevation: 3,
    borderRadius: Border.br_12,
    zIndex: 4,
    overflow: "hidden",
    backgroundColor: Color.backgroundDefaultDefault,
  },
});

export default Spherobeforeafter;
