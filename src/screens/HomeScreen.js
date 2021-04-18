import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShopList from "../components/Home/ShopList";
import UpdateList from "../components/Home/UpdateList";
import Colors from "../shared/styles/Colors";
import { useShopContext } from "../context/ShopContext";
import LoadingScreen from "../components/LoadingScreen";

export default function HomeScreen({ navigation }) {
  const { shops, getAllFeeds } = useShopContext();

  // console.log("home feeds", feeds);

  const selectShop = (item) => {
    navigation.navigate("Shop", item);
  };

  return (
    <View style={styles.homeScreen}>
      <ShopList shops={shops} selectShop={selectShop} />
      <Text style={styles.title}>All Updates</Text>
      {/* {feeds.length > 0 && <UpdateList feeds={feeds} />} */}
      {getAllFeeds().length > 0 ? (
        <UpdateList feeds={getAllFeeds()} />
      ) : (
        <LoadingScreen />
      )}
      {/* <UpdateList feeds={getAllFeeds()} /> */}
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
