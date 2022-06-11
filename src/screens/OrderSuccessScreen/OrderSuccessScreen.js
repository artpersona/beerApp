import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import LottieView from "lottie-react-native";

function SuccessOrderCard() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.success__container}>
      <View style={styles.wrapper}>
        <View style={styles.header__container}></View>
        <View style={styles.content__container}>
          <Text style={styles.content__header}>
            Your order is being processed
          </Text>
          <View style={styles.image__container}>
            <LottieView
              source={require("../../../assets/animations/69380-success-check.json")}
              autoPlay
              loop={false}
            />
          </View>
          <View style={styles.tracking__container}>
            <Text style={styles.tracking__code}>1P77XDZF5</Text>
            <Text style={styles.tracking__text}>Tracking Code</Text>
          </View>
          <Text style={styles.confirmation__text}>
            This serves as your confirmation that we have received your order.
            Thank you for supporting!
          </Text>
        </View>

        <TouchableOpacity style={styles.next__button} onPress={handleBack}>
          <Text style={styles.next__text}>Return to dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SuccessOrderCard;
