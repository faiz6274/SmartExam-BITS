import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon3 from "../assets/Icon3.svg";
import Icon1 from "../assets/Icon1.svg";
import {
  Color,
  StyleVariable,
  Height,
  Width,
  LineHeight,
  FontFamily,
} from "../GlobalStyles";

const Button1 = ({
  size = "Medium",
  state = "Default",
  variant = "Primary",
}) => {
  return (
    <View style={[styles.button, styles.starCommon]}>
      <View style={[styles.star, styles.starCommon]}>
        <Icon3 style={[styles.icon, styles.iconLayout]} />
      </View>
      <Text style={styles.button2}>Cancel</Text>
      <View style={[styles.star, styles.starCommon]}>
        <Icon1 style={[styles.buttonIcon, styles.iconLayout]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starCommon: {
    display: "none",
    overflow: "hidden",
  },
  iconLayout: {
    color: Color.textDefaultDefault,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  button: {
    borderRadius: StyleVariable.radius200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: StyleVariable.space300,
    gap: StyleVariable.space200,
  },
  star: {
    height: Height.height_16,
    width: Width.width_16,
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
    fontSize: StyleVariable.bodySizeMedium,
    lineHeight: LineHeight.lh_16,
    fontFamily: FontFamily.interRegular,
    color: Color.textNeutralDefault,
    textAlign: "left",
  },
  buttonIcon: {
    height: "50%",
    width: "50%",
    top: "25%",
    right: "25%",
    bottom: "25%",
    left: "25%",
  },
});

export default Button1;
