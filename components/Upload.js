import * as React from "react";
import { StyleSheet, View } from "react-native";
import Icon4 from "../assets/Icon4.svg";
import { Height, Width, Color } from "../GlobalStyles";

const Upload = ({ size = 48 }) => {
  return (
    <View style={styles.upload}>
      <Icon4 style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  upload: {
    height: Height.height_48,
    width: Width.width_48,
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    height: "75%",
    width: "75%",
    top: "12.5%",
    right: "12.5%",
    bottom: "12.5%",
    left: "12.5%",
    maxWidth: "100%",
    maxHeight: "100%",
    color: Color.textDefaultDefault,
    overflow: "hidden",
  },
});

export default Upload;
