import React, { useState, useRef } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import PhoneInput from "react-native-phone-number-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FIREBASE as firebase } from "../../../../shared/context/FirebaseContext";
import { useNavigation } from "@react-navigation/native";

import { Button } from "react-native-elements";

function NumberInput() {
  const navigation = useNavigation();

  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const recaptchaVerifier = useRef(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const sendVerification = () => {
    if (valid) {
      setButtonLoading(true);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(formattedValue, recaptchaVerifier.current)
        .then((id) =>
          setTimeout(() => {
            setButtonLoading(false);
            navigation.navigate("PhoneVerification", { verificationId: id });
          }, 1000)
        );
    } else {
      setValid(false);
    }
  };

  const onChangeText = (text) => {
    setValid(phoneInput.current?.isValidNumber(text));
    setValue(text);
  };

  const onChangeFormattedText = (text) => {
    setFormattedValue(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.number__text}>Phone Verification</Text>
        <Text style={[styles.note__text, { marginTop: 5 }]}>
          A 6-digit OTP will be sent via SMS to verify your number
        </Text>
      </View>

      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="PH"
        layout="first"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        containerStyle={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
        disableArrowIcon={false}
        textInputProps={{
          keyboardType: "phone-pad",
          placeholder: "Enter Number",
          maxLength: 10,
        }}
      />

      <Button
        title="Next"
        titleStyle={styles.next__text}
        buttonStyle={styles.next__button}
        containerStyle={styles.button__container}
        raised
        loading={buttonLoading}
        loadingStyle={styles.loading__style}
        onPress={sendVerification}
        disabled={!valid}
      />
    </KeyboardAvoidingView>
  );
}

export default NumberInput;
