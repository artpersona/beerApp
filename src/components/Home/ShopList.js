import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../shared/styles/Colors";

export default function ShopList({ shops, selectShop }) {
  return (
    <View style={styles.shopList}>
      <View style={styles.shopList__header}>
        <Text style={styles.shopList__title}>Sureplus</Text>
        <Text style={styles.shopList__subtitle}>All Restaurants</Text>
      </View>
      <FlatList
        // style={styles.shopList__list}
        data={shops}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectShop(item)}>
            <Image source={{ uri: item.file }} style={styles.shopList__image} />
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
  shopList__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  shopList__title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
  },
  shopList__subtitle: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  shopList__image: {
    width: 60,
    height: 60,
    borderRadius: 80 / 2,
    margin: 5,
    borderColor: "#222",
    borderWidth: 1,
  },
});
