import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../shared/styles/Colors";

export default function Updates() {
  return <View style={styles.updates}></View>;
}

const styles = StyleSheet.create({
  updates: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
