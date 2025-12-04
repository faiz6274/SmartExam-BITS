import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [screen, setScreen] = React.useState("login");

  if (screen === "login") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SmartExam - Login</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.buttonText}>Login (Demo)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartExam - Home</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScreen("login")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
