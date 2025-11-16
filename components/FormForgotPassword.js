import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import ButtonGroup from "./ButtonGroup";
import { StyleVariable, Color, FontFamily, LineHeight } from "../GlobalStyles";

const FormForgotPassword = () => {
  return (
    <View style={[styles.formForgotPassword, styles.inputBorder]}>
      <View style={styles.inputField}>
        <Text style={[styles.label, styles.labelTypo]}>Email</Text>
        <Text style={[styles.description, styles.labelTypo]}>Description</Text>
        <View style={[styles.input, styles.inputBorder]}>
          <Text style={[styles.value, styles.labelTypo]}>Value</Text>
        </View>
        <Text style={[styles.error, styles.labelTypo]}>Error</Text>
      </View>
      <ButtonGroup
        align="Center"
        size="Medium"
        state="Default"
        variant="Subtle"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBorder: {
    borderWidth: StyleVariable.strokeBorder,
    borderColor: Color.borderDefaultDefault,
    borderStyle: "solid",
    backgroundColor: Color.backgroundDefaultDefault,
    borderRadius: StyleVariable.radius200,
  },
  labelTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    fontSize: StyleVariable.bodySizeMedium,
  },
  formForgotPassword: {
    height: 83,
    padding: StyleVariable.space600,
    gap: StyleVariable.space600,
    minWidth: 320,
  },
  inputField: {
    width: 272,
    gap: StyleVariable.space200,
    display: "none",
  },
  label: {
    color: Color.textDefaultDefault,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    lineHeight: LineHeight.lh_22,
    fontSize: StyleVariable.bodySizeMedium,
    alignSelf: "stretch",
  },
  description: {
    width: 240,
    color: Color.textDefaultSecondary,
    fontFamily: FontFamily.interRegular,
    fontSize: StyleVariable.bodySizeMedium,
    textAlign: "left",
    lineHeight: LineHeight.lh_22,
    display: "none",
  },
  input: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: StyleVariable.space400,
    paddingVertical: StyleVariable.space300,
    minWidth: 240,
    alignSelf: "stretch",
  },
  value: {
    flex: 1,
    lineHeight: LineHeight.lh_16,
    color: Color.textDefaultTertiary,
    fontFamily: FontFamily.interRegular,
    fontSize: StyleVariable.bodySizeMedium,
    textAlign: "left",
  },
  error: {
    color: Color.textDefaultDefault,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    lineHeight: LineHeight.lh_22,
    fontSize: StyleVariable.bodySizeMedium,
    display: "none",
  },
});

export default FormForgotPassword;
