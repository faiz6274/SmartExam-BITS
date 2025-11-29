import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axios";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("token/", { username, password });
      await AsyncStorage.setItem("accessToken", res.data.access);
      await AsyncStorage.setItem("refreshToken", res.data.refresh);
      navigation.replace("Home");
    } catch (e) {
      console.error("Login error:", e);
      Alert.alert("Login failed", "Check your credentials and try again");
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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 8 }}
      />
      <Button title="Login" onPress={login} />
      <View style={{ height: 8 }} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
