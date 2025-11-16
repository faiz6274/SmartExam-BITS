import * as React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Button1 from "./Button1";
import Icon2 from "../assets/Icon2.svg";
import Icon21 from "../assets/Icon21.svg";
import {
  Color,
  StyleVariable,
  Width,
  Height,
  LineHeight,
  FontFamily,
} from "../GlobalStyles";

const ButtonGroup = ({ align = "Justify", size, state, variant }) => {
  return (
    <View style={[styles.buttonGroup, styles.buttonFlexBox]}>
      <Button1 size={size} state={state} variant={variant} />
      <Pressable style={[styles.button, styles.buttonFlexBox]}>
        <View style={styles.star}>
          <Icon2 style={[styles.icon, styles.iconLayout]} />
        </View>
        <Text style={styles.button2}>Reset Password</Text>
        <View style={styles.star}>
          <Icon21 style={[styles.buttonGroupIcon, styles.iconLayout]} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconLayout: {
    color: Color.iconBrandOnBrand,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  buttonGroup: {
    alignSelf: "stretch",
    gap: StyleVariable.space400,
  },
  button: {
    borderRadius: StyleVariable.radius200,
    backgroundColor: Color.backgroundBrandDefault,
    borderStyle: "solid",
    borderColor: Color.borderBrandDefault,
    borderWidth: StyleVariable.strokeBorder,
    padding: StyleVariable.space300,
    gap: StyleVariable.space200,
    overflow: "hidden",
  },
  star: {
    width: Width.width_16,
    display: "none",
    height: Height.height_16,
    overflow: "hidden",
  },
  icon: {
    height: "79.38%",
    width: "83.13%",
    top: "8.13%",
    right: "8.75%",
    bottom: "12.5%",
    left: "8.13%",
  },
  button2: {
    width: Width.width_125,
    fontSize: StyleVariable.bodySizeMedium,
    lineHeight: LineHeight.lh_16,
    fontFamily: FontFamily.interRegular,
    color: Color.textBrandOnBrand,
    textAlign: "left",
    height: Height.height_16,
  },
  buttonGroupIcon: {
    height: "50%",
    width: "50%",
    top: "25%",
    right: "25%",
    bottom: "25%",
    left: "25%",
  },
});

export default ButtonGroup;
