import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../../config";
export default StyleSheet.create({
  option__container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.secondary,
    borderRadius: 5,
    borderWidth: 2,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 5,
    width: 80,
  },
  option__select: {
    backgroundColor: Colors.primary,
  },
  option__text: {
    color: Colors.black,
    fontSize: RFValue(10.5),
    padding: 5,
    textAlign: "center",
  },
});
