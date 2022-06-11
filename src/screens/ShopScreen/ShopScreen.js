import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import UpdateList from "../../components/Home/UpdateList";
import Colors from "../../shared/styles/Colors";
import { ShopsRoute } from "../../routes/ShopsRoute";
import { useShopContext } from "../../context/ShopContext";
import empty from "../../img/empty.png";
import { FAB, Badge } from "react-native-paper";
import { useOrderContext } from "../../context/OrderContext";

export default function ShopScreen({ route }) {
  const { products, getStoreFeeds } = useShopContext();
  const { orders } = useOrderContext();
  const [viewStyle, setViewStyle] = useState("one");

  const getProducts = () => {
    return products.filter((product) => product.store_id === route.params.id);
  };

  return (
    <View style={styles.shopScreen}>
      {getStoreFeeds(route.params.id).length > 0 ? (
        <UpdateList
          feeds={getStoreFeeds(route.params.id)}
          columns={viewStyle}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={empty}
            style={styles.shopScreen__emptyImage}
            resizeMode="cover"
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: `${Colors.primary}`,
            }}
          >
            Unfortunately, there's no update in this store.
          </Text>
        </View>
      )}

      {/* <ShopsRoute /> */}

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
        onPress={() => console.log("Pressed")}
        active={false}
      />
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
  shopScreen__emptyImage: {
    height: 250,
    width: undefined,
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
