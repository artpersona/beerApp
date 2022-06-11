import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

function ListEmpty({ title, type }) {
  if (type == "order_summary") {
    return (
      <View style={{ height: "80%", alignItems: "center" }}>
        <LottieView
          source={require("../../../assets/animations/16656-empty-state.json")}
          autoPlay
          loop={false}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>No {title} found.</Text>
      </View>
    );
  }
}

export default ListEmpty;
