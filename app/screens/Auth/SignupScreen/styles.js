import { StyleSheet } from "react-native";
import { Theme, Colors } from "../../../config";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  isTablet,
  deviceWidth,
  deviceHeight,
} from "../../../utils/device.utility";
const buttonWidth = isTablet ? RFPercentage(50) : "100%";
const imageSize = isTablet ? 200 : 120;
const iconLocation = isTablet ? 70 : 30;
export default StyleSheet.create({
  buttonActive: {
    backgroundColor: "#818184",
    paddingVertical: "7%",
  },
  buttonContainer: {
    marginVertical: RFValue(10),
    width: buttonWidth,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  button: {
    backgroundColor: "#1D1D1F",
    paddingVertical: "7%",
  },
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
    top: "5%",
    paddingHorizontal: 40,
    height: "100%",
  },
  img: {
    width: imageSize,
    height: imageSize,
  },
  imageBackground: {
    flex: 1,
    position: "absolute",
    width: "100%",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
  },
  textFooter: {
    fontWeight: "100",
    color: Colors.darkGray,
  },
  textLogin: {
    fontWeight: "bold",
    color: Colors.secondary,
  },

  reseller__group: {
    marginTop: isTablet ? 80 : 30,
  },

  buttonReseller: {
    marginVertical: 10,
    width: buttonWidth,
    alignSelf: "center",
  },

  iconContainer: {
    marginLeft: -100,
  },

  titleStyle: {
    fontSize: RFValue(13),
    textAlign: "center",
  },
  iconStyle: {
    position: "absolute",
    left: iconLocation,
  },

  login__text: {
    fontSize: RFValue(21),
    textAlign: "center",
    fontFamily: "OpenSans_semiBold",
    color: Colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: deviceHeight * 0.05,
    alignItems: "center",
  },

  or__text: {
    textAlign: "center",
    color: Colors.darkGray,
    fontFamily: "OpenSans",
  },
});
