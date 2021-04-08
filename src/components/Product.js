import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import Colors from "../shared/styles/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useShopContext } from "../context/ShopContext";

export default function Product({ product }) {
  // console.log("product card", product);
  const { getShopInfo } = useShopContext();
  var shopInfo = getShopInfo(product.store_id);
  const redirect = () => {
    Linking.openURL(
      "https://expo.io/--/to-exp/exp%3A%2F%2Fexp.host%2F%40jperez1738%2Fdavao-market"
    );
  };
  return (
    <LinearGradient
      colors={["#0FEFFD", "#FF00F5"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.card}>
        <View style={styles.card__header}>
          <View style={styles.card__headerLeft}>
            <Image
              source={{ uri: shopInfo?.file }}
              style={styles.card__avatar}
            />
            <View>
              <Text style={styles.card__store}>{shopInfo?.name}</Text>
              <Text style={styles.card__handle}>
                @{shopInfo?.name.split(" ").join("_")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card__body}>
          {product.file && (
            <View style={styles.card__imageContainer}>
              <Image
                source={{ uri: product.file }}
                style={styles.card__image}
                resizeMode="contain"
              />
            </View>
          )}

          <Text style={styles.card__name}>{product.name}</Text>

          <Text style={styles.card__caption}>{product.description}</Text>

          <Text style={styles.card__price}>
            <Text style={styles.card__label}>Price:</Text>{" "}
            {parseInt(product.price).toFixed(2)}
          </Text>

          <Text style={styles.card__price}>
            <Text style={styles.card__label}>Stock:</Text> {product.stock}
          </Text>

          <TouchableOpacity onPress={() => redirect()}>
            <View style={styles.card__button}>
              <Text style={styles.card__buttonText}>ORDER NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginVertical: 7,
    padding: 1,
    borderRadius: 5,
  },
  card: {
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
  },
  card__store: {
    color: "#fff",
    fontSize: 14,
  },
  card__handle: {
    textTransform: "lowercase",
    color: Colors.primary,
    fontSize: 10,
  },
  card__name: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    // color: Colors.primary,
  },
  card__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  card__avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    margin: 5,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  // card__restaurant: {
  //   width: 25,
  //   height: 25,
  //   borderRadius: "50%",
  // },
  card__headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  card__body: {},
  card__caption: {
    fontSize: 15,
    paddingVertical: 10,
    // color: Colors.primary,
    textAlign: "center",
    color: "#C4C4C4",
  },
  card__price: {
    fontSize: 15,
    // paddingVertical: 5,
    // color: Colors.primary,
    textAlign: "justify",
    color: "#C4C4C4",
  },
  card__label: {
    fontWeight: "700",
  },
  card__imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
  },
  card__image: {
    flex: 1,
    height: 250,
    width: undefined,
    borderRadius: 5,
    borderRadius: 10,
  },
  card__button: {
    backgroundColor: "purple",
    paddingVertical: 7,
    borderRadius: 5,
    marginVertical: 10,
  },
  card__buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});