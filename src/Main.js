import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { HomeRoute } from "./routes/HomeRoute";

export default function Main() {
  return (
    <View style={styles.main}>
      <HomeRoute />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
