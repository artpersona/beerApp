import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AppContext } from "../../../shared/context/AppContext";
function Option({ option, onPress, productDetails, setProductDetails }) {
  const handleSelectOption = () => {
    let tempData = { ...productDetails };
    if (tempData.selectedOption) {
      tempData.subtotal -=
        parseInt(tempData.selectedOption.amount) * tempData.quantity;
      delete tempData.selectedOption;
    }
    tempData.selectedOption = option;
    tempData.subtotal += parseInt(option.amount) * tempData.quantity;
    setProductDetails(tempData);
  };
  return (
    <TouchableOpacity
      style={
        productDetails.selectedOption.name == option.name
          ? [styles.option__container, styles.option__select]
          : styles.option__container
      }
      onPress={handleSelectOption}
    >
      <Text
        style={
          productDetails.selectedOption.name == option.name
            ? [styles.option__text, { color: "white" }]
            : styles.option__text
        }
      >
        {option.name}
      </Text>
    </TouchableOpacity>
  );
}

export default Option;
