import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import api from "../api/axios";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("register/", {
        username,
        email,
        password,
        role: "student",
      });
      Alert.alert("Success", "Account created. Please login.");
      navigation.goBack();
    } catch (e) {
      console.error("Registration error:", e);
      Alert.alert(
        "Registration failed",
        e.response?.data?.username?.[0] || "Please try again"
      );
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 8 }}
      />
      <Button title="Register" onPress={register} />
    </View>
  );
}
