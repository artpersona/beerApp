import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FirebaseProvider } from "./src/context/FirebaseContext";
import { ShopProvider } from "./src/context/ShopContext";
import MainScreen from "./src/Main";

export default function App() {
  return (
    <FirebaseProvider>
      <ShopProvider>
        <MainScreen />
      </ShopProvider>
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
