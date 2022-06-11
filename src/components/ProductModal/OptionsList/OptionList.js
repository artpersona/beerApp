import React from "react";
import { FlatList } from "react-native";
import Option from "./Option";
function OptionList({ options }) {
  return (
    <FlatList
      data={options}
      renderItem={({ item, index }) => (
        <Option option={item} key={index.toString()} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: "2%",
        paddingHorizontal: "5%",
      }}
    />
  );
}

export default OptionList;
