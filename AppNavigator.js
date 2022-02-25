import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecordInput from './screens/inputScreen';

import ListScreen from "./screens/listScreen";

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
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={ListScreen}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="AddScreen"
          component={RecordInput}
          options={{
            title: "Add a company",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
