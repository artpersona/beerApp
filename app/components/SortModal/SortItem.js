import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { RadioButton } from "react-native-paper";
function SortItem({ name, checked, onSelect }) {
  return (
    <TouchableOpacity style={styles.choice__container} onPress={onSelect}>
      <Text>{name}</Text>
      <RadioButton status={checked} onPress={onSelect} />
    </TouchableOpacity>
  );
}

export default SortItem;
