/* eslint-disable linebreak-style */
import React, { useContext, useReducer, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";
import { WelcomeScreen, HomeScreen, OnBoardingScreen } from "../../screens";
import { LoginScreens, SignupScreen } from "../Auth";
import { ProductItemDetails } from "../../components";
import AuthReducer from "../../reducers/AuthReducer";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { AuthContext } from "../../shared/context/AuthContext";
import OrderDetailsScreen from "../OrderDetailsScreen/OrderDetailsScreen";
import PhoneLoginScreen from "../Auth/PhoneLoginScreen/PhoneLoginScreen";
import PhoneVerificationScreen from "../Auth/PhoneLoginScreen/PhoneVerificationScreen";
import ResellerApplication from "../ResellerApplication/ResellerApplication";
import LocationPickerScreen from "../LocationPickerScreen/LocationPickerScreen";
import SearchScreen from "../SearchScreen/SearchScreen";
import MapScreen from "../MapScreen/MapScreen";
import { Storage } from "../../utils";

function MainNavigation() {
  const Stack = createStackNavigator();
  const { loggedUser, getCustomerProfile } = useContext(AuthContext);

  const Auth = { isAuthenticated: false, token: null };

  const [state, dispatch] = useReducer(AuthReducer, Auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [initialUse, setInitialUse] = useState(false);
  useEffect(() => {
    let token = null;
    let profile = null;
    const refreshToken = async () => {
      try {
        token = await Storage.getToken();
        profile = await Storage.getProfile();

        if (profile) {
          getCustomerProfile()
            .then(() => {
              setAuthenticated(true);
            })
            .catch((error) =>
              Alert.alert("Sorry something went wrong", error.message)
            );

          dispatch({ type: "AUTHENTICATE", token: token });
        } else {
          setInitialUse(true);
        }
      } catch (e) {
        Alert.alert("Sorry something went wrong", e.message);
      }
    };
    refreshToken();
  }, []);

  if (initialUse) {
    return (
      <Stack.Navigator
        initialRouteName={loggedUser != null ? "Welcome" : "Welcome"}
        screenOptions={{ animationEnabled: false, headerShown: false }}
      >
        <>
          <Stack.Screen name="Shop">
            {(props) => <HomeScreen {...props} />}
          </Stack.Screen>

          <Stack.Screen name="LogIn" component={LoginScreens} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          <Stack.Screen
            name="ProductItemDetails"
            component={ProductItemDetails}
          />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
          <Stack.Screen
            name="PhoneVerification"
            component={PhoneVerificationScreen}
          />
        </>

        <Stack.Screen name="Apply" component={ResellerApplication} />
        <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    );
  } else {
    if (isAuthenticated) {
      return (
        <Stack.Navigator
          initialRouteName={"Welcome"}
          screenOptions={{ animationEnabled: false, headerShown: false }}
        >
          <Stack.Screen name="Shop">
            {(props) => <HomeScreen {...props} />}
          </Stack.Screen>

          <Stack.Screen name="LogIn" component={LoginScreens} />
          <Stack.Screen name="Signup" component={SignupScreen} />

          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          <Stack.Screen
            name="ProductItemDetails"
            component={ProductItemDetails}
          />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
          <Stack.Screen
            name="PhoneVerification"
            component={PhoneVerificationScreen}
          />
          <Stack.Screen name="Apply" component={ResellerApplication} />
          <Stack.Screen
            name="LocationPicker"
            component={LocationPickerScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

export default MainNavigation;
