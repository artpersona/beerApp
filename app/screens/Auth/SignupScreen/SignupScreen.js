import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Button } from "react-native-elements";
import { Theme, Colors } from "../../../config";
import Icon from "react-native-vector-icons/Feather";
import SocialIcons from "react-native-vector-icons/FontAwesome";
import { ResponseModal } from "../../../components";
import styles from "./styles";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { AuthContext } from "../../../shared/context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

function SignupScreen({ navigation, props }) {
  const [isSigningUpGoogle, setIsSigningUpGoogle] = useState(false);
  const [isSigningUpFacebook, setIsSigningupFacebook] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const { setLoggedUser, customerAuth } = useContext(AuthContext);

  const handleFacebookLogin = async () => {
    setIsSigningupFacebook(true);
    Facebook.initializeAsync({
      appId: "841213123459448",
      appName: "DavaoMarket",
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    switch (type) {
      case "success": {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        customerAuth(credential)
          .then(() => {
            setIsSigningupFacebook(false);
            navigation.navigate("Shop");
          })
          .catch((error) => {
            setIsSigningupFacebook(false);
            Alert.alert("Sorry something went wrong", error.message);
          });
      }

      case "cancel": {
        setIsSigningupFacebook(false);
        setLoggedUser(null);
        // Alert.alert("Oops!", "Login failed!")
      }
    }
  };

  async function signInWithGoogleAsync() {
    setIsSigningUpGoogle(true);
    setSignUpErrors(null);
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "292276894849-t6p3pmuf38ha9jqciiv832fjunbe1l4u.apps.googleusercontent.com",
        iosClientId:
          "292276894849-4sjveb8s29fp26b0egrbuhtn9op4ao7t.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        customerAuth(credential).then(() => {
          setIsSigningUpGoogle(false);
          navigation.navigate("Shop");
        });
      } else {
        setLoggedUser(null);
        return { cancelled: true };
      }
    } catch (error) {
      console.error({ error });
      setSignUpErrors(error);
      return { error: true };
    }
  }

  const navigateToPhoneScreen = () => {
    navigation.navigate("PhoneLogin");
  };

  const navigateToApply = () => {
    navigation.navigate("Apply");
  };

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        title={"Success!"}
        subtitle={
          "We’ve sent a confirmation link to your email address. Please don’t forget to confirm it!"
        }
        onBackButtonPress={() => setShowResponseModal(false)}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={["#891C1A", "#651A15", "#1D1D1F"]}
        locations={[0.1, 0.1, 0.4]}
        style={styles.background}
      />
      <View style={styles.imageBackground}>
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
          <Text style={styles.login__text}>Login Account</Text>
        </View>

        <View style={styles.container}>
          <Button
            title="Sign in with FACEBOOK"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.titleStyle}
            icon={
              <SocialIcons
                name="facebook"
                size={RFValue(25)}
                color={"white"}
                style={styles.iconStyle}
              />
            }
            raised
            loading={isSigningUpFacebook}
            onPress={handleFacebookLogin}
            disabled={true}
            disabledStyle={styles.button}
          />

          <Button
            title="Sign in with GOOGLE"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.titleStyle}
            icon={
              <SocialIcons
                name="google-plus"
                size={RFValue(25)}
                color={"white"}
                style={styles.iconStyle}
              />
            }
            raised
            loading={isSigningUpGoogle}
            onPress={signInWithGoogleAsync}
            disabled={true}
            disabledStyle={styles.button}
          />

          <Button
            title="Sign in with SMS"
            buttonStyle={styles.buttonActive}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.titleStyle}
            icon={
              <SocialIcons
                name="phone"
                size={RFValue(25)}
                color={"white"}
                style={styles.iconStyle}
              />
            }
            raised
            // loading={isSigningUpGoogle}
            onPress={navigateToPhoneScreen}
          />

          <View style={styles.reseller__group}>
            <Text style={styles.or__text}>or</Text>
            <Button
              title="Apply as a Store"
              buttonStyle={Theme.buttonApply}
              containerStyle={styles.buttonReseller}
              titleStyle={styles.titleStyle}
              raised
              onPress={navigateToApply}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default SignupScreen;
