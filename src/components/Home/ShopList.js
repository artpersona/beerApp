import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ShopList({ shops, selectShop }) {
  return (
    <View style={styles.shopList}>
      <FlatList
        // style={styles.shopList__list}
        data={shops}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectShop(item)}>
            <Image
              source={require("../../img/pizza.jpg")}
              style={styles.shopList__image}
            />
          </TouchableOpacity>
        )}
      />
      {/* <View style={styles.shopList__list}>
        {shops.map((shop) => (
          <TouchableOpacity key={shop.id} onPress={() => selectShop(shop)}>
            <Image source={{ uri: shop.img }} style={styles.shopList__image} />
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  shopList: {
    paddingVertical: 10,
    // marginBottom: 5,
  },
  shopList__list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  shopList__image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    margin: 5,
    // borderColor: "lightgray",
    // borderWidth: 1,
  },
});
