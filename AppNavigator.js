import React from "react";
import { Platform, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecordInput from "./screens/inputScreen";

import BottomTabs from "./screens/bottomTabs";
import AccountScreen from "./screens/accountScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import { firestore, auth } from './FirebaseConfig';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerMode: "screen",
          headerShown: true,
          headerTintColor: Platform.OS === "android" ? "black" : "black",
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? "white" : "white",
          },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              style={{ width: 35, height: 35 }}
              source={require("./financial-profit.png")}
            />
          ),
        }}
      >
        <Stack.Screen name="HomeScreen" component={BottomTabs} />
        <Stack.Screen name="AddScreen" component={RecordInput} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
