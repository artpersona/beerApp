import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FirebaseProvider } from "./src/context/FirebaseContext";
import MainScreen from "./src/Main";

export default function App() {
  return (
    <FirebaseProvider>
      <MainScreen />
    </FirebaseProvider>
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
