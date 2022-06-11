import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../shared/styles/Colors";

const containerWidth = "90%";
const containerHeight = 70;

function SummaryItem({ product }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.wrapper}>
        <View
          style={{
            width: "65%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.quantityText}>
                {product && product.quantity}x
              </Text>
              <Text style={styles.displayNameText}>
                {product && product.name}
              </Text>
            </View>
            <Text style={styles.subTotalPrice}>Php {product.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingVertical: RFValue(10),
    width: "85%",
  },

  container: {
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: Colors.cart,
    borderRadius: 19,
    borderWidth: 3,

    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    minHeight: containerHeight,
    width: containerWidth,
  },

  quantityText: {
    color: "black",
    fontSize: RFValue(13),
  },

  displayNameText: {
    color: "black",
    fontSize: RFValue(10),
    marginLeft: "7%",
    marginRight: "5%",
    width: "80%",
  },

  subTotalPrice: {
    color: "black",
    fontSize: RFValue(10),
    fontWeight: "bold",
  },
});

export default SummaryItem;
