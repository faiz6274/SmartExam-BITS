const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import FrontPage from "./screens/FrontPage";
import SignIn from "./screens/SignIn";
import Checkout from "./screens/Checkout";
import Checkout1 from "./screens/Checkout1";
import Root from "./screens/Root";
import Spherobeforeafter from "./screens/Spherobeforeafter";
import Root1 from "./screens/Root1";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="FrontPage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="FrontPage"
              component={FrontPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Content"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Checkout1"
              component={Checkout1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Button1"
              component={Root}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Content1"
              component={Spherobeforeafter}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FrameComponent1"
              component={Root1}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Checkout1 />
        )}
      </NavigationContainer>
    </>
  );
};
export default App;
