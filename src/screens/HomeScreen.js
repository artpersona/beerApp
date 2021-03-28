import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShopList from "../components/Home/ShopList";
import UpdateList from "../components/Home/UpdateList";
import Colors from "../shared/styles/Colors";
import { useShopContext } from "../context/ShopContext";

export default function HomeScreen({ navigation }) {
  const { shops } = useShopContext();

  const [feeds, setFeeds] = useState([
    {
      id: "1",
      name: "Sureplus Express",
      store: "Hokaido",
      caption:
        "Lorem ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forza ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forza ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forzaipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forza",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg",
    },
    {
      id: "2",
      name: "Bec and Geris’ Express",
      store: "Creamline",
      caption:
        "Lorem ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forza ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forza ipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forzaipsum dolor sit amet illiet es ail consectetur adipiscing elit. Ultrices et pulvinar id convallis quis luctus forza",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg",
    },
  ]);

  const selectShop = (item) => {
    navigation.navigate("Shop", item);
  };

  return (
    <View style={styles.homeScreen}>
      <ShopList shops={shops} selectShop={selectShop} />
      <Text style={styles.title}>All Updates</Text>
      <UpdateList feeds={feeds} />
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
