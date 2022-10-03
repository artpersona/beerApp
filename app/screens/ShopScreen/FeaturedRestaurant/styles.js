import { Dimensions, StyleSheet } from "react-native";
const d = Dimensions.get("window");
import { RFValue } from "react-native-responsive-fontsize";
import { isTablet } from "../../../utils/device.utility";
const containerWidth = isTablet ? d.width / 2.9 : d.width / 3;
export default StyleSheet.create({
  container: {
    height: d.height / 8,
    justifyContent: "flex-end",
    marginHorizontal: 5,
    width: containerWidth,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
  },
  image: {
    borderRadius: 100,
    height: "100%",
    width: "100%",
  },
  image__container: {
    height: d.width / 9,
    width: d.width / 9,
  },
  info__container: {
    alignItems: "flex-end",
    // borderRadius: 10,
    flexDirection: "row",
    height: d.width / 4,
    width: "100%",
  },
  info__wrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
    marginLeft: "3%",
  },
  name__text: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: RFValue(9),
  },
  promotion__text: {
    color: "white",
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(10),
  },
  text: {
    color: "white",
  },
  text__container: {
    marginLeft: "5%",
  },
});
