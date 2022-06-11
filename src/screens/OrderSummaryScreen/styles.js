import { StyleSheet } from "react-native";
import Colors from "../../shared/styles/Colors";
const buttonHeight = 50;
const borderRadius = 20;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },

  buttonPrimary: {
    backgroundColor: Colors.cart,
    borderRadius: borderRadius,
    height: buttonHeight,
  },

  confirmOrderContainer: {
    width: "90%",
    marginVertical: 20,
    borderRadius: 15,
    alignSelf: "center",
  },
});
