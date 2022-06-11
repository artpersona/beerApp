import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Card";
import Product from "../Product";
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
    return <Product key={index} product={item} type="single" />;
  };

  const renderItemDouble = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={{ width: "50%" }}>
          <Product key={index} product={item[0]} />
        </View>
        {item.length > 1 && (
          <View style={{ width: "50%" }}>
            <Product key={index} type={"double"} product={item[1]} />
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
        keyExtractor={(item) => item.id}
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
