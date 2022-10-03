/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Product from "./Product";
import { splitArray } from "../../utils/product.utility";
export default function UpdateList({ feeds, columns }) {
  const [productSingle, setProductSingle] = useState([]);
  const [productDouble, setProductDouble] = useState([]);

  useEffect(() => {
    let tempProducts = [...feeds];
    tempProducts = splitArray(tempProducts);
    setProductDouble(tempProducts);
    setProductSingle(feeds);
  }, [feeds]);

  const renderItemSingle = ({ item, index }) => {
    return <Product key={item.key} product={item} type="single" />;
  };

  const renderItemDouble = ({ item, index }) => {
    return (
      <View
        style={{ flexDirection: "row", width: "100%" }}
        key={`${item[0].key} - ${item[1].key}`}
      >
        <View style={{ width: "50%" }}>
          <Product key={item[0].key} product={item[0]} />
        </View>
        {item.length > 1 && (
          <View style={{ width: "50%" }}>
            <Product key={item[1].key} type={"double"} product={item[1]} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.updateList}>
      <FlatList
        data={columns == "one" ? productSingle : productDouble}
        initialNumToRender={7}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => {
          return item.key;
        }}
        renderItem={
          columns == "one" ? renderItemSingle || [] : renderItemDouble || []
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
