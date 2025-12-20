import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import InstructorScreen from "./src/screens/InstructorScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import SubmissionsListScreen from "./src/screens/SubmissionsListScreen";

console.log("[APP.JS] Starting to load imports...");

const Stack = createNativeStackNavigator();

console.log("[APP.JS] Stack Navigator created");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.log("[ERROR BOUNDARY] Caught error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ERROR BOUNDARY] Error Details:", error);
    console.error(
      "[ERROR BOUNDARY] Component Stack:",
      errorInfo.componentStack
    );
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0f0f1e",
            padding: 20,
          }}
        >
          <Text
            style={{
              color: "#ff4444",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            ERROR CAUGHT
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {this.state.error?.toString()}
          </Text>
          {this.state.errorInfo && (
            <Text style={{ color: "#aaa", fontSize: 10, textAlign: "center" }}>
              {this.state.errorInfo.componentStack}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  console.log("[APP.JS] App component rendering");

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ErrorBoundary>
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
            <Stack.Screen
              name="Submissions"
              component={SubmissionsListScreen}
            />
            <Stack.Screen name="Instructor" component={InstructorScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </>
  );
}
