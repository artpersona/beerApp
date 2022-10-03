import React from "react";
import { FlatList } from "react-native";
import Option from "./Option";
function OptionList({ options, productDetails, setProductDetails }) {
  return (
    <FlatList
      data={options}
      renderItem={({ item, index }) => (
        <Option
          option={item}
          key={index.toString()}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: "2%",
        paddingHorizontal: "5%",
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default OptionList;
