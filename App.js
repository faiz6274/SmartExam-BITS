import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

/* Screens - ensure these files exist in ./screens */
import FrontPage from "./screens/FrontPage";
import SignIn from "./screens/SignIn";
import Checkout from "./screens/Checkout";
import Checkout1 from "./screens/Checkout1";
import Root from "./screens/Root";
import Root1 from "./screens/Root1";
import Spherobeforeafter from "./screens/Spherobeforeafter";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="FrontPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="FrontPage" component={FrontPage} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Checkout1" component={Checkout1} />
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="Root1" component={Root1} />
          <Stack.Screen
            name="Spherobeforeafter"
            component={Spherobeforeafter}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
