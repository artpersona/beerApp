import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Card";
import Product from "../Product";

export default function UpdateList({ feeds }) {
  // console.log("feeds", feeds);
  return (
    <View style={styles.updateList}>
      <FlatList
        data={feeds}
        initialNumToRender={7}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.category === "custom_feed" ? (
            <Card feed={item} />
          ) : (
            <Product product={item} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  updateList: {
    flex: 1,
    paddingVertical: 5,
  },
});
