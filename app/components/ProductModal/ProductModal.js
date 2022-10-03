/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OptionList from "./OptionsList/OptionList";
import QuantityButton from "./QuantityButton/QuantityButton";
import { Button } from "react-native-elements";
import styles from "./styles";
import { Colors } from "../../config";
import { AppContext } from "../../shared/context/AppContext";
import {
  getCurrentPrice,
  fetchActiveOptions,
} from "../../utils/product.utility";
function ProductModal({ isVisible, setIsVisible, product }) {
  const { addOrderAdditionals } = useContext(AppContext);

  const [productDetails, setProductDetails] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);
  const [optionsActive, setOptionsActive] = useState([]);

  // Helper Functions

  useEffect(() => {
    setProductDetails([]);
    if (product) {
      let tempOptionsActive = fetchActiveOptions(product);
      setOptionsActive(tempOptionsActive);
      let tempData = JSON.parse(JSON.stringify(product));

      let currPrice = getCurrentPrice(product);
      if (tempOptionsActive.length > 0) {
        currPrice += parseInt(tempOptionsActive[0]?.amount);
        tempData.selectedOption = tempOptionsActive[0];
      }

      tempData.subtotal = currPrice;
      tempData.quantity = 1;
      tempData.stock -= 1;
      setProductDetails(tempData);

      setCurrentPrice(currPrice);
    }
  }, [product]);

  const handleAddIndividualOrder = () => {
    addOrderAdditionals(productDetails);
    ToastAndroid.show("Order assigned", 3000);
    setIsVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <MaterialCommunityIcons name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.file }}
                style={styles.card__image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.actionsContainer}>
              <Text style={styles.product__name}>{product.name}</Text>
              <Text style={styles.product__descript}>
                {product.description}
              </Text>
            </View>
            {optionsActive.length > 0 && (
              <View style={styles.options__container}>
                <Text
                  style={{
                    marginHorizontal: "7%",
                    fontSize: RFValue(12),
                    color: Colors.primary,
                  }}
                >
                  Variants
                </Text>
                <OptionList
                  options={optionsActive}
                  productDetails={productDetails}
                  setProductDetails={setProductDetails}
                />
              </View>
            )}

            <View style={styles.quantityContainer}>
              <Text style={styles.priceText}>
                ₱{" "}
                {productDetails.subtotal
                  ? productDetails.subtotal
                  : currentPrice}
              </Text>
              <QuantityButton
                productDetails={productDetails}
                setProductDetails={setProductDetails}
              />
            </View>

            <Button
              title="Add to Cart"
              buttonStyle={styles.cartButton}
              containerStyle={styles.cartButtonContainer}
              titleStyle={styles.cartButtonText}
              onPress={handleAddIndividualOrder}
              disabled={
                optionsActive.length > 0 && !productDetails.selectedOption
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ProductModal;
