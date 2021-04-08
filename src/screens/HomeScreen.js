import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShopList from "../components/Home/ShopList";
import UpdateList from "../components/Home/UpdateList";
import Colors from "../shared/styles/Colors";
import { useShopContext } from "../context/ShopContext";

export default function HomeScreen({ navigation }) {
  const { shops, feeds } = useShopContext();

  console.log("home feeds", feeds);

  const selectShop = (item) => {
    navigation.navigate("Shop", item);
  };

  return (
    <View style={styles.homeScreen}>
      <ShopList shops={shops} selectShop={selectShop} />
      <Text style={styles.title}>All Updates</Text>
      {feeds.length > 0 && <UpdateList feeds={feeds} />}
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    paddingVertical: 10,
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
