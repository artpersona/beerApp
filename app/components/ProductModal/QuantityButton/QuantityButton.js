import React, { useContext, useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/AntDesign";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { getCurrentPrice } from "../../../utils/product.utility";
function QuantityButton({ productDetails, setProductDetails }) {
  const currentPrice = getCurrentPrice(productDetails);
  const [newStock, setNewStock] = useState(0);

  useEffect(() => {
    checkSoldOut(productDetails.name);
  }, [newStock]);

  const checkSoldOut = (name) => {
    if (parseInt(newStock, 10) < 0) {
      Alert.alert(`${name} have been sold out`);
      return;
    }
  };

  const increment = () => {
    const optionPrice = productDetails.selectedOption
      ? parseInt(productDetails.selectedOption.amount)
      : 0;

    let tempData = { ...productDetails };
    if (tempData.stock != 0) {
      if (tempData.quantity < tempData.limit) {
        tempData.quantity += 1;
        tempData.stock -= 1;
        tempData.subtotal += currentPrice + optionPrice;
        setProductDetails(tempData);
      }
    } else {
      Alert.alert(`${tempData.name} have been sold out`);
    }
  };

  const decrement = () => {
    const optionPrice = productDetails.selectedOption
      ? parseInt(productDetails.selectedOption.amount)
      : 0;
    let tempData = { ...productDetails };
    if (tempData.quantity != 1) {
      tempData.quantity -= 1;
      tempData.stock += 1;
      tempData.subtotal -= currentPrice + optionPrice;
      setProductDetails(tempData);
    }
  };

  return (
    <View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.minusIconContainer} onPress={decrement}>
          <Icon name="minus" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.quantityValue}>
          <Text>{productDetails.quantity}</Text>
        </View>
        <TouchableOpacity style={styles.plusIconContainer} onPress={increment}>
          <Icon name="plus" size={RFValue(18)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QuantityButton;
