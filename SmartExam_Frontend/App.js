import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import InstructorScreen from "./src/screens/InstructorScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import SubmissionsListScreen from "./src/screens/SubmissionsListScreen";

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Submissions" component={SubmissionsListScreen} />
        <Stack.Screen name="Instructor" component={InstructorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
