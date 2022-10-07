/* eslint-disable linebreak-style */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
/* eslint-disable linebreak-style */
import { StyleSheet, Dimensions } from "react-native";
import { Theme, Colors } from "../../config";
import { RFValue } from "react-native-responsive-fontsize";
import { isTablet } from "../../utils/device.utility";

const d = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  subTotalValues: {
    color: Colors.darkestGrey,
    fontSize: RFValue(12),
  },
  inputContainer: {
    // marginHorizontal: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    width: 215,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "90%",
    // marginRight: 20,
    borderRadius: 10,
    height: isTablet ? 70 : 40,
    alignSelf: "flex-end",
    justifyContent: "center",
  },

  confirmOrderContainer: {
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 40,
    marginHorizontal: 20,
    marginVertical: 20,
    width: "100%",
  },
  orderModalButtonContainer: {
    alignSelf: "center",
    borderRadius: 0,

    marginHorizontal: 20,
    marginVertical: 10,
    width: "100%",
  },
  confirmOrder__text: {
    fontFamily: "OpenSans_semiBold",
    fontSize: RFValue(14),
  },
  subTotalPrice: {
    bottom: 20,
    color: Colors.darkestGrey,
    fontSize: RFValue(13),
    fontWeight: "bold",
  },
  paymentNotes: {
    // margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  paymentNoteHeader: {
    color: Colors.secondary,
    fontSize: RFValue(18),
    fontWeight: "bold",
    lineHeight: 30,
  },

  // success styles

  imageContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  confirmationText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    lineHeight: 20,
    textAlign: "justify",
  },
  codeText: {
    color: Colors.white,
    fontSize: RFValue(23),
  },
  codeContainer: {
    alignItems: "center",
    backgroundColor: Colors.secondary,
    height: 60,
    justifyContent: "center",
    marginVertical: 20,
  },
  totalText: {
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(13),
    marginTop: 10,
  },

  success__container: {
    backgroundColor: "white",
    flex: 1,
  },

  wrapper: {
    width: "90%",
    // height: "100%",
    marginTop: d.height / 25,
    alignSelf: "center",
  },
  header__container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  content__container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: d.height / 12,
  },

  content__header: {
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(15),
    marginBottom: d.height / 20,
  },

  tracking__container: {
    alignItems: "center",
    marginVertical: d.height / 30,
  },

  tracking__code: {
    color: Colors.primary,
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(33),
  },

  tracking__text: {
    fontFamily: "OpenSans",
    fontSize: RFValue(12),
    textTransform: "uppercase",
  },

  confirmation__text: {
    fontFamily: "OpenSans",
    fontSize: RFValue(12),
    textAlign: "center",
    width: "90%",
  },

  next__button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: isTablet ? 20 : 35,
    elevation: 2,
    justifyContent: "center",
    marginTop: "30%",
    padding: isTablet ? 20 : 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: "100%",
  },
  next__text: {
    color: "white",
    fontFamily: "OpenSans_semiBold",
    fontSize: RFValue(15),
  },
  image__container: {
    height: d.height / 3,
    justifyContent: "center",
    width: d.height / 3,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  header__notes_text: {
    color: Colors.darkestGrey,
    fontSize: RFValue(11),
    marginTop: 20,
    textAlign: "justify",
    // marginHorizontal: 15,
  },

  payment__method_text: {
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontSize: RFValue(11),
  },

  refLoc__text: {
    fontFamily: "OpenSans",
    fontSize: RFValue(11),
    // marginHorizontal: 10,
  },
  refLoc__container: {
    // marginHorizontal: 10,
    marginVertical: 15,
    height: isTablet ? 70 : 40,
    // backgroundColor: "#1080D0",
  },

  refLoc__dropdown_text: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: RFValue(11),
    justifyContent: "flex-start",
  },
  voucher__component: {
    height: isTablet ? 70 : 40,
    width: "100%",
  },
  voucher__title: {
    fontFamily: "OpenSans",
    fontSize: RFValue(14),
    textTransform: "capitalize",
  },

  header: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: "#000000",
    elevation: 5,
    // paddingTop: "8%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: "whitesmoke",
    backgroundColor: "white",
  },
  header__wrapper: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "8%",
    width: "85%",
  },

  close__icon: {
    top: -15,
  },

  header__text: {
    color: "#FFBE30",
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(17),
    width: "90%",
  },

  panelHeader: {
    alignItems: "center",
    overflow: "hidden",
  },

  panel: {
    backgroundColor: "white",
    height: "100%",
  },
  panel__wrapper: {
    alignSelf: "center",
    marginTop: "5%",
    width: "85%",
  },
  panel__label: {
    fontFamily: "OpenSans",
    fontSize: RFValue(11),
  },
  panel__value: {
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(13),
    marginTop: "1%",
  },

  input__container: {
    marginTop: "6%",
  },

  input__field: {
    borderColor: "rgba(158, 150, 150, .5)",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    marginTop: "2%",
    padding: 10,
    width: "100%",
  },

  confirm__button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFBD30",
    borderRadius: 12,
    elevation: 2,
    justifyContent: "center",
    marginTop: RFValue(25),
    padding: 13,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: "100%",
  },

  confirm__text: {
    color: "white",

    fontFamily: "OpenSans_bold",
    fontSize: RFValue(16),
  },

  unavailable__header: {
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(13),

    marginBottom: 5,
  },
  options__container: {
    alignItems: "center",
    borderColor: "whitesmoke",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  options__text: {
    fontSize: RFValue(14),
  },

  page__header: {
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(17),
    textAlign: "center",
  },
});
