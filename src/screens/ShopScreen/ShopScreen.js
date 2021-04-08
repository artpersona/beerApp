import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import UpdateList from "../../components/Home/UpdateList";
import Colors from "../../shared/styles/Colors";
import { ShopsRoute } from "../../routes/ShopsRoute";
import { useShopContext } from "../../context/ShopContext";

export default function ShopScreen({ route }) {
  const { products } = useShopContext();
  const getProducts = () => {
    return products.filter((product) => product.store_id === route.params.id);
  };

  return (
    <View style={styles.shopScreen}>
      {/* <Text style={styles.shopItem__name}>{route.params.name}</Text> */}
      {/* <View style={styles.shopScreen__header}>
        <Image
          source={{ uri: route.params.file }}
          style={styles.shopScreen__image}
        />
      </View> */}
      {/* <Text style={styles.title}>All Updates</Text> */}
      <UpdateList feeds={getProducts()} />
      {/* <ShopsRoute /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  shopScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  shopScreen__header: {
    justifyContent: "center",
    alignItems: "center",
  },
  shopScreen__image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    marginVertical: 10,
  },
  shopItem__name: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
  },
  title: {
    textAlign: "center",
    paddingVertical: 10,
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
