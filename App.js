import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppNavigator from "./AppNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import {LogBox} from 'react-native';
export default function App() {
  //The issue comes from Firebase using a deprecated version of AsyncStorage.  
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
