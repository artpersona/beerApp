import React, { useEffect, useState } from "react";
import * as Font from "expo-font";

import Main from "./app/screens/Main";
import LoadingScreen from "./app/screens/LoadingScreen/LoadingScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Image download error"]);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    loadFontAssets();
  }, []);

  const loadFontAssets = async () => {
    try {
      await Font.loadAsync({
        OpenSans: require("./app/assets/fonts/OpenSans-Regular.ttf"),
        OpenSans_semiBold: require("./app/assets/fonts/OpenSans-SemiBold.ttf"),
        OpenSans_bold: require("./app/assets/fonts/OpenSans-Bold.ttf"),
        OpenSans_light: require("./app/assets/fonts/OpenSans-Light.ttf"),
        Nunito_semiBold: require("./app/assets/fonts/Nunito-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  return fontsLoaded ? <Main /> : <LoadingScreen />;
  // return fontsLoaded ? <MapScreen /> : <LoadingScreen />;
}
