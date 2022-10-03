import React from "react";
import { Theme } from "../../../config";
import { Input } from "react-native-elements";

const CustomInput = (props) => (
  <Input
    {...props}
    labelStyle={Theme.labelStyle}
    // inputContainerStyle={Theme.inputContainer}
    inputStyle={[Theme.inputStyle]}
    autoCapitalize="none"
    containerStyle={{ paddingHorizontal: 0 }}
  />
);

export default CustomInput;
