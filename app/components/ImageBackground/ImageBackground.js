import React from "react";
import { ImageBackground as Background } from "react-native";
import CachedImage from "react-native-expo-cached-image";

import styles from "./styles";

function ImageBackground({ children }) {
  return (
    <CachedImage
      style={styles.backgroundImage}
      isBackground={true}
      source={require("../../assets/bg.png")}
      resizeMode="cover"
    >
      {children}
    </CachedImage>
  );
}

export default ImageBackground;
