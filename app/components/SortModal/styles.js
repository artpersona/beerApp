import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { deviceHeight } from "../../utils/device.utility";
import { Colors } from "../../config";
export default StyleSheet.create({
  header__text: {
    color: Colors.primary,
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(17),
    width: "90%",
  },
  modal__container: {
    backgroundColor: Colors.white,
    borderRadius: RFValue(20),
    height: deviceHeight / 3,
  },
  wrapper: {
    margin: RFValue(20),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  content__container: {
    marginTop: "8%",
  },

  choice__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.whitesmoke,
    paddingVertical: "3%",
  },
});
