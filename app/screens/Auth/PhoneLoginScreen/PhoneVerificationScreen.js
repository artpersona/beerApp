import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "./styles";
import OTP from "./PhonePages/OTP";

const d = Dimensions.get("window");

function PhoneVerificationScreen({ route }) {
  const { verificationId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header__container}>
        <Text style={styles.davao__text}>Davao</Text>
        <Text style={styles.market__text}>Market</Text>
      </View>

      <View style={{ height: d.height / 1.5, backgroundColor: "white" }}>
        <View style={styles.wrapper}>
          <OTP verificationId={verificationId} />
        </View>
      </View>
    </View>
  );
}

export default PhoneVerificationScreen;
