import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import ShopList from "../components/Home/ShopList";
import UpdateList from "../components/Home/UpdateList";
import Colors from "../shared/styles/Colors";
import { useShopContext } from "../context/ShopContext";
import { useOrderContext } from "../context/OrderContext";
import LoadingScreen from "../components/LoadingScreen";
import { FAB, Badge } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const { shops, getAllFeeds } = useShopContext();
  const { orders } = useOrderContext();

  const [viewStyle, setViewStyle] = useState("one");

  const selectShop = (item) => {
    navigation.navigate("Shop", item);
  };

  const navigateToOrderSummary = () => {
    navigation.navigate("Order Summary");
  };

  return (
    <View style={styles.homeScreen}>
      <ShopList shops={shops} selectShop={selectShop} />
      {/* {feeds.length > 0 && <UpdateList feeds={feeds} />} */}
      {getAllFeeds().length > 0 ? (
        <UpdateList feeds={getAllFeeds()} columns={viewStyle} />
      ) : (
        <LoadingScreen />
      )}

      <FAB
        style={styles.fab2}
        icon={viewStyle == "two" ? "view-grid-outline" : "view-day-outline"}
        small
        onPress={() => {
          return viewStyle == "two" ? setViewStyle("one") : setViewStyle("two");
        }}
        color={"white"}
      />

      <Badge
        style={{
          position: "absolute",
          elevation: 40,
          bottom: 58,
          right: 18,
          zIndex: 1,
        }}
        size={25}
        visible={orders.length > 0}
      >
        <Text>{orders.length}</Text>
      </Badge>

      <FAB
        style={styles.fab}
        icon="cart"
        onPress={navigateToOrderSummary}
        active={false}
      />
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
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 18,
  },

  fab1Container: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  fab: {
    backgroundColor: Colors.cart,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  fab2: {
    backgroundColor: "#1877F2",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: Dimensions.get("window").height / 1.5,
  },

  badge: {
    zIndex: 999,
    elevation: 5,
  },
});
