import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import InstructorScreen from "./src/screens/InstructorScreen";

const Stack = createNativeStackNavigator();

function ScannerPlaceholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f0f1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#64c8ff", fontSize: 18 }}>Scanner (WIP)</Text>
    </View>
  );
}

function SubmissionsPlaceholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f0f1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#64c8ff", fontSize: 18 }}>Submissions (WIP)</Text>
    </View>
  );
}

export default function App() {
  console.log("App rendering - Full Navigation");

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#0f0f1e" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerPlaceholder} />
        <Stack.Screen name="Submissions" component={SubmissionsPlaceholder} />
        <Stack.Screen name="Instructor" component={InstructorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
