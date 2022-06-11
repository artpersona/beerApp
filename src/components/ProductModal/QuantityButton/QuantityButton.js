import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/AntDesign";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";
function QuantityButton() {
  return (
    <View>
      <View style={[styles.quantityContainer]}>
        <TouchableOpacity style={styles.minusIconContainer}>
          <Icon name="minus" size={20} color="white" />
        </TouchableOpacity>

        <View style={[styles.quantityValue]}>
          <Text>5</Text>
        </View>
        <TouchableOpacity style={styles.plusIconContainer}>
          <Icon name="plus" size={RFValue(18)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QuantityButton;
