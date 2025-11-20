import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Padding } from "../GlobalStyles";
import ExamList from "../components/ExamList";
import TopBar from "../components/TopBar";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Root = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TopBar />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ExamList />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.backgroundDefaultDefault,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    width: SCREEN_WIDTH, // ✅ Responsive
    minHeight: SCREEN_HEIGHT, // ✅ Responsive
    paddingHorizontal: Padding.padding_16,
  },
});

export default Root;
