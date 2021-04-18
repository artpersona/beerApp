import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Colors from "../shared/styles/Colors";

export default function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
