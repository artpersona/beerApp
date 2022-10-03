/* eslint-disable react-native/no-color-literals */
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import { deviceWidth } from "../../utils/device.utility";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function CategoryCard({ item }) {
  const navigation = useNavigation();

  const handleNavigateToCategoryScreen = () => {
    navigation.navigate("CategoryProductScreen", {
      category: item,
    });
  };
  return (
    <ImageBackground source={{ uri: item?.uri }} style={styles.shopList__image}>
      <TouchableOpacity onPress={handleNavigateToCategoryScreen} key={item.key}>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
          style={styles.info__container}
        >
          <Text style={styles.category__name}>{item.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  shopList__image: {
    borderColor: "#222",
    borderWidth: 1,
    height: deviceWidth / 3,
    marginHorizontal: 2,
    marginVertical: 5,
    width: deviceWidth / 3,
  },
  image: {
    flex: 1,
  },

  info__container: {
    alignItems: "flex-end",
    // borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  category__name: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CategoryCard;
