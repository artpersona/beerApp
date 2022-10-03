import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../../config";
export default StyleSheet.create({
  minusIconContainer: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 100,
    height: RFValue(30),
    justifyContent: "center",
    opacity: 0.8,
    width: RFValue(30),
  },
  plusIconContainer: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 100,
    height: RFValue(30),
    justifyContent: "center",
    opacity: 0.8,
    width: RFValue(30),
  },
  quantityContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: 100,
  },
  quantityValue: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
