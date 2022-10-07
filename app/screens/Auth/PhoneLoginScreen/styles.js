import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { deviceHeight, deviceWidth } from "../../../utils/device.utility";
import { Colors } from "../../../config";
const d = Dimensions.get("window");

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  imageHeader: {
    width: "125%",
    height: deviceHeight * 0.38,
    borderBottomLeftRadius: deviceWidth * 0.6,
    borderBottomRightRadius: deviceWidth * 0.6,
    overflow: "hidden",
    alignSelf: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
  },
  wrapper: {
    flex: 1,
    marginTop: 34,
    width: "80%",
    alignSelf: "center",
  },

  davao__text: {
    color: "#FFBE30",
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(30),
  },
  market__text: {
    fontSize: RFValue(35),
    textAlign: "center",
    fontFamily: "OpenSans_bold",
    color: Colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: deviceHeight * 0.12,
    alignItems: "center",
  },
  content__wrapper: {
    backgroundColor: "red",
    marginTop: "40%",
    height: "100%",
  },
  next__button: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBD30",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  next__text: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "white",
    fontFamily: "OpenSans",
  },
  otpText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "white",
  },
  input__field: {
    color: "white",
  },
});
