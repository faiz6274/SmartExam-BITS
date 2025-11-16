import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import {
  Padding,
  Color,
  FontFamily,
  LineHeight,
  FontSize,
  Height,
  Width,
  Gap,
  Border,
} from "../GlobalStyles";

const View1 = () => {
  return (
    <View style={[styles.view, styles.viewSpaceBlock]}>
      <View style={[styles.module, styles.viewSpaceBlock]}>
        <View style={styles.interface}>
          <Image
            style={styles.aModernMinimalist1}
            contentFit="cover"
            source={require("../assets/A-modern-minimalist-2.png")}
          />
        </View>
        <View style={styles.authentication}>
          <Pressable style={styles.button}>
            <Text style={[styles.login, styles.loginTypo]}>Login</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={[styles.signIn, styles.loginTypo]}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewSpaceBlock: {
    paddingLeft: Padding.padding_16,
    height: 310,
    zIndex: null,
  },
  loginTypo: {
    display: "flex",
    textAlign: "left",
    color: Color.backgroundDefaultDefault,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    lineHeight: LineHeight.lh_20,
    fontSize: FontSize.fs_14,
    height: Height.height_20,
    alignItems: "center",
  },
  view: {
    width: 343,
    flexDirection: "row",
  },
  module: {
    gap: 35,
    width: Width.width_327,
  },
  interface: {
    zIndex: 1,
    width: 232,
    paddingLeft: 63,
    height: Height.height_169,
    flexDirection: "row",
  },
  aModernMinimalist1: {
    width: 169,
    zIndex: 1,
    height: Height.height_169,
  },
  authentication: {
    height: 106,
    gap: Gap.gap_26,
    width: Width.width_327,
  },
  button: {
    height: Height.height_40,
    borderRadius: Border.br_8,
    backgroundColor: Color.colorBlack,
    justifyContent: "center",
    paddingHorizontal: Padding.padding_16,
    paddingVertical: Padding.padding_0,
    alignItems: "center",
    width: Width.width_327,
    flexDirection: "row",
  },
  login: {
    width: Width.width_40,
  },
  signIn: {
    width: Width.width_63,
  },
});

export default View1;
