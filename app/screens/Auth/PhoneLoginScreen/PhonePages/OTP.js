import React, { useState, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "./styles";
import { FIREBASE as firebase } from "../../../../shared/context/FirebaseContext";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../../../shared/context/AuthContext";

function OTP({ verificationId }) {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const { customerAuth } = useContext(AuthContext);
  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    customerAuth(credential)
      .then(() => {
        navigation.navigate("Shop");
      })
      .catch((error) => {
        Alert.alert("Sorry something went wrong", error.message);
      });
  };

  const handleCodeChange = (value) => {
    if (/^\d+$/.test(value) || value === "") {
      setCode(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.number__text, { marginBottom: "12%" }]}>
        OTP Verification
      </Text>
      <TextInput
        keyboardType={"phone-pad"}
        underlineColorAndroid="transparent"
        style={styles.input__field}
        onChangeText={(e) => handleCodeChange(e)}
        maxLength={6}
        placeholder="Enter 6 digit OTP"
        placeholderTextColor="#FFF"
      />
      <Text style={[styles.note__text, { marginTop: 25 }]}>
        A 6-digit OTP will be sent via SMS to verify your number
      </Text>

      <TouchableOpacity
        style={[styles.next__button, styles.button__container]}
        onPress={confirmCode}
      >
        <Text style={styles.next__text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OTP;
