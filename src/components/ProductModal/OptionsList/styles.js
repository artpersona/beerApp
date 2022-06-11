import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
  option__container: {
    width: 80,
    height: 40,
    backgroundColor: "white",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF891D",
    borderRadius: 5,
  },
  option__text: {
    padding: 5,
    textAlign: "center",
    fontSize: RFValue(10.5),
    color: "black",
  },
});
