import * as React from "react";
import { TextInput, StyleSheet, Pressable, Text, View } from "react-native";
import {
  FontSize,
  Padding,
  Border,
  Height,
  FontFamily,
  Width,
  Gap,
  Color,
  LineHeight,
} from "../GlobalStyles";

const Content = () => {
  return (
    <View style={styles.content}>
      <View style={styles.inputButton}>
        <TextInput
          style={[styles.field, styles.fieldTypo]}
          placeholder="name"
          multiline={false}
          placeholderTextColor="#828282"
        />
        <TextInput
          style={[styles.field, styles.fieldTypo]}
          placeholder="email@domain.com"
          multiline={false}
          placeholderTextColor="#828282"
        />
        <TextInput
          style={[styles.field, styles.fieldTypo]}
          placeholder="email@domain.com"
          multiline={false}
          placeholderTextColor="#828282"
        />
        <TextInput
          style={[styles.field, styles.fieldTypo]}
          placeholder="password"
          multiline={false}
          placeholderTextColor="#828282"
        />
        <Pressable style={[styles.button, styles.fieldLayout]}>
          <Text style={[styles.continue, styles.fieldTypo]}>Continue</Text>
        </Pressable>
      </View>
      <Text style={[styles.byClickingContinueContainer, styles.fieldTypo1]}>
        <Text
          style={styles.byClickingContinue}
        >{`By clicking continue, you agree to our `}</Text>
        <Text style={styles.termsOfService}>Terms of Service</Text>
        <Text style={styles.byClickingContinue}>{` and `}</Text>
        <Text style={styles.termsOfService}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldTypo: {
    fontSize: FontSize.fs_14,
    alignItems: "center",
  },
  fieldLayout: {
    paddingHorizontal: Padding.padding_16,
    flexDirection: "row",
    borderRadius: Border.br_8,
    height: Height.height_40,
  },
  fieldTypo1: {
    fontFamily: FontFamily.interRegular,
    alignSelf: "stretch",
  },
  content: {
    width: Width.width_374,
    height: 179,
    paddingHorizontal: Padding.padding_24,
    gap: Gap.gap_24,
    paddingVertical: Padding.padding_0,
    alignItems: "center",
  },
  inputButton: {
    width: Width.width_327,
    gap: Gap.gap_16,
  },
  field: {
    backgroundColor: Color.backgroundDefaultDefault,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro300,
    borderWidth: 1,
    paddingVertical: Padding.padding_8,
    width: "100%",
    fontFamily: FontFamily.interRegular,
    alignSelf: "stretch",
    paddingHorizontal: Padding.padding_16,
    flexDirection: "row",
    borderRadius: Border.br_8,
    height: Height.height_40,
  },
  button: {
    backgroundColor: Color.colorBlack,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: Padding.padding_16,
    flexDirection: "row",
    borderRadius: Border.br_8,
    height: Height.height_40,
    paddingVertical: Padding.padding_0,
    alignItems: "center",
  },
  continue: {
    height: Height.height_20,
    width: Width.width_64,
    lineHeight: LineHeight.lh_20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.backgroundDefaultDefault,
    textAlign: "left",
    display: "flex",
  },
  byClickingContinueContainer: {
    fontSize: FontSize.fs_12,
    lineHeight: 18,
    textAlign: "center",
  },
  byClickingContinue: {
    color: Color.colorGray100,
  },
  termsOfService: {
    color: Color.colorBlack,
  },
});

export default Content;
