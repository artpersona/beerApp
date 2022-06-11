import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  minusIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF891D",
    width: RFValue(30),
    height: RFValue(30),
    opacity: 0.8,
  },
  plusIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF891D",
    width: RFValue(30),
    height: RFValue(30),
    opacity: 0.8,
  },
  quantityValue: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
