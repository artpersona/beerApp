import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import UpdateList from "../components/Home/UpdateList";
import Colors from "../shared/styles/Colors";

export default function ShopScreen({ route }) {
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
  return (
    <View style={styles.shopScreen}>
      {/* <Text style={styles.shopItem__name}>{route.params.name}</Text> */}
      <Image
        source={{ uri: route.params.imgUrl }}
        style={styles.shopScreen__image}
      />
      <Text style={styles.title}>All Updates</Text>
      <UpdateList feeds={feeds} />
    </View>
  );
}

const styles = StyleSheet.create({
  shopScreen: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    borderTopColor: "transparent",
    alignItems: "center",
  },
  shopScreen__image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
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
});