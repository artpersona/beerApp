/* eslint-disable react-native/sort-styles */
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryCard from "./CategoryCard";
export default function ShopList({ shops }) {
  return (
    <>
      <View style={styles.shopList}>
        <FlatList
          data={shops}
          initialNumToRender={10}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <CategoryCard item={item} />;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  shopList: {
    paddingVertical: 5,
    // marginBottom: 5,
    marginHorizontal: 10,
  },
});
