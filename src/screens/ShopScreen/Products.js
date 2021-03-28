import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../shared/styles/Colors";

export default function Products() {
  return <View style={styles.products}></View>;
}

const styles = StyleSheet.create({
  products: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
