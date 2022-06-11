import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
function Option({ option, onPress }) {
  return (
    <View style={styles.option__container}>
      <Text style={styles.option__text}>{option.name}</Text>
    </View>
  );
}

export default Option;
