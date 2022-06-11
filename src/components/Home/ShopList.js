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
import Icon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";

export default function ShopList({ shops, selectShop }) {
  const navigation = useNavigation();

  return (
    <View style={styles.shopList}>
      <View style={styles.shopList__header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="navicon" size={26} color="black" />
          </TouchableOpacity>

          <Text style={styles.shopList__title}>Beer App</Text>
        </View>
        <Text style={styles.shopList__subtitle}>All Restaurants</Text>
      </View>
      <FlatList
        // style={styles.shopList__list}
        data={shops}
        initialNumToRender={10}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectShop(item)}>
            <Image source={{ uri: item.file }} style={styles.shopList__image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shopList: {
    paddingVertical: 5,
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
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginVertical: 5,
    marginHorizontal: 2,
    borderColor: "#222",
    borderWidth: 1,
  },
});
