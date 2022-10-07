import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import styles from "./styles";
import OTP from "./PhonePages/OTP";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../../../config";

const d = Dimensions.get("window");

function PhoneVerificationScreen({ route }) {
  const { verificationId } = route.params;
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#891C1A", "#651A15", "#1D1D1F"]}
        locations={[0.1, 0.1, 0.4]}
        style={styles.background}
      />

      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 10,
            position: "absolute",
            left: 0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="chevron-left"
              size={30}
              color={Colors.white}
              style={{ marginLeft: 10, marginTop: 34 }}
            />
          </TouchableOpacity>
        </View>
        {/* END:: Back button */}

        <View style={styles.imageHeader}>
          <Image
            source={require("../../../assets/newImages/authBg.png")}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
          <Text style={styles.market__text}>BEER APP</Text>
        </View>

        <View style={{ height: d.height / 1.5 }}>
          <View style={styles.wrapper}>
            <OTP verificationId={verificationId} />
          </View>
        </View>
      </View>
    </>
  );
}

export default PhoneVerificationScreen;
