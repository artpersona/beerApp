import React from "react";
import styles from "./styles";
import { Input } from "react-native-elements";

const CustomInput = (props) => (
  <Input
    {...props}
    labelStyle={styles.labelStyle}
    // inputContainerStyle={Theme.inputContainer}
    inputStyle={[styles.inputStyle]}
    autoCapitalize="none"
    containerStyle={{ paddingHorizontal: 0 }}
  />
);

export default CustomInput;
