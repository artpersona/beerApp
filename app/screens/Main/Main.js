/* eslint-disable linebreak-style */
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import FirebaseProvider from "../../shared/context/FirebaseContext";
import ConfigProvider from "../../shared/context/ConfigContext";
import AppProvider from "../../shared/context/AppContext";
import AuthProvider from "../../shared/context/AuthContext";
import PromoProvider from "../../shared/context/PromoContext";
import useUpdates from "../../hooks/useUpdates";
import ModalView from "../../components/ModalView/ModalView";

import MainNavigation from "./MainNavigation";
import { Colors } from "../../config";
export default function Main() {
  const Updates = useUpdates();

  // TODO:: Transfer here the homestack from homescreen

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={Colors.primary}
      />

      <FirebaseProvider>
        <ConfigProvider>
          <AuthProvider>
            <AppProvider>
              <PromoProvider>
                <NavigationContainer>
                  <ModalView
                    visible={Updates.isAvailable}
                    onClose={() => {}}
                    ok_text={!Updates.isFetching ? "UPDATE" : "Please Wait"}
                    onPress1={() => Updates.updateToLatest()}
                    width="65%"
                    animation="bounceIn"
                    title="Heads up"
                    logoName="error"
                    description={
                      Updates.isFetching
                        ? "Downloading latest update..."
                        : "A new update is available."
                    }
                  />
                  <MainNavigation></MainNavigation>
                </NavigationContainer>
              </PromoProvider>
            </AppProvider>
          </AuthProvider>
        </ConfigProvider>
      </FirebaseProvider>
    </SafeAreaProvider>
  );
}
