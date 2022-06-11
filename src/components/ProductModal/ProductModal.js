import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OptionList from "./OptionsList/OptionList";
import QuantityButton from "./QuantityButton/QuantityButton";
import { Button } from "react-native-elements";
import styles from "./styles";
function ProductModal({ isVisible, setIsVisible, product, onPress }) {
  console.log("product is: ", product);
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
            {product?.options?.length > 0 && (
              <View style={styles.options__container}>
                <Text
                  style={{
                    marginHorizontal: "7%",
                    fontSize: RFValue(12),
                    color: "#FF891D",
                  }}
                >
                  Variants
                </Text>
                <OptionList options={product.options} />
              </View>
            )}

            <View style={styles.quantityContainer}>
              <Text style={styles.priceText}>Php 100.00</Text>
              <QuantityButton />
            </View>

            <Button
              title="Add to Cart"
              buttonStyle={styles.cartButton}
              containerStyle={styles.cartButtonContainer}
              titleStyle={styles.cartButtonText}
              onPress={() => {
                setIsVisible(false);
                onPress();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ProductModal;
