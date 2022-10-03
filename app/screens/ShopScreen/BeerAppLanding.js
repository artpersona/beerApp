import React, { useState, useContext, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { FAB, Badge } from "react-native-paper";
import styles from "./BeerAppStyles";
import { AppContext } from "../../shared/context/AppContext";
import { ConfigContext } from "../../shared/context/ConfigContext";
import NetInfo from "@react-native-community/netinfo";

import { ShopList, ProductList, CustomHeader } from "../../components";
export default function HomeScreen({ navigation }) {
  const { allRestaurants, newsFeed, orders, fetchAllRestaurants } =
    useContext(AppContext);
  const { currentLocation, currentCityCategory, currentMiniCategory } =
    useContext(ConfigContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection"
        );
      } else {
        if (currentLocation != null) fetchAllRestaurants();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentLocation, currentCityCategory, currentMiniCategory]);

  const [viewStyle, setViewStyle] = useState("one");

  const selectShop = (item) => {
    navigation.navigate("Shop", item);
  };

  const navigateToOrderSummary = () => {
    navigation.navigate("OrderSummary");
  };

  return (
    <>
      <CustomHeader />
      <View style={styles.homeScreen}>
        <ShopList shops={allRestaurants} selectShop={selectShop} />
        {/* {feeds.length > 0 && <UpdateList feeds={feeds} />} */}

        {newsFeed == null ? (
          <Text>Loading</Text>
        ) : newsFeed.length > 0 ? (
          <ProductList feeds={newsFeed} columns={viewStyle} />
        ) : (
          <Text>No Featured Products Found</Text>
        )}

        <FAB
          style={styles.fab2}
          icon={viewStyle == "two" ? "view-grid-outline" : "view-day-outline"}
          small
          onPress={() => {
            return viewStyle == "two"
              ? setViewStyle("one")
              : setViewStyle("two");
          }}
          color={"white"}
        />

        <Badge style={styles.badge} size={25} visible={orders.length > 0}>
          <Text>{orders.length}</Text>
        </Badge>

        <FAB
          style={styles.fab}
          icon="cart"
          onPress={navigateToOrderSummary}
          active={false}
        />
      </View>
    </>
  );
}
