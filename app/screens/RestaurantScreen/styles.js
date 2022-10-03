/* eslint-disable react-native/no-color-literals */
/* eslint-disable linebreak-style */
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../config";
import { RFValue } from "react-native-responsive-fontsize";

const d = Dimensions.get("window");

const height = d.height > 600 ? d.height / 1.7 : d.height / 2.35;

export default StyleSheet.create({
  activeTabItem: {
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 5,
  },
  bottom__container: {
    alignItems: "center",
    flexDirection: "row",
    height: "70%",
    paddingHorizontal: 20,
    width: "100%",
  },
  closeModal__button: {
    backgroundColor: "#DD6B55",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  coverPhoto: {
    height: "100%",
    width: "100%",
  },
  coverPhotoContainer: {
    maxHeight: RFValue(180),
    minWidth: "100%",
  },
  divider: {
    backgroundColor: "#ddd",
    height: 1,
    width: "100%",
  },
  fab: {
    backgroundColor: "#1080D0",
    bottom: 0,
    color: "white",
    margin: 16,
    position: "absolute",
    right: 0,
  },
  fab2: {
    backgroundColor: Colors.primary,
    bottom: height,
    color: "white",
    margin: 16,
    position: "absolute",
    right: 0,
  },
  handler__text: {
    color: "black",
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(14),
    textTransform: "uppercase",
    width: "90%",
  },
  header__container: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
    width: "95%",
  },
  image__container: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: "whitesmoke",
    borderWidth: 2,
    height: 200,
    justifyContent: "center",
    width: 200,
  },
  inactiveTabItem: {
    backgroundColor: "white",
  },

  info__container: {
    alignItems: "flex-end",
    height: "100%",
    width: "100%",
  },
  info_icon__container: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#FFBE30",
    borderRadius: 100,
    height: RFValue(28),
    justifyContent: "center",
    padding: 3,
    right: "3%",
    top: "20%",
    width: RFValue(28),
  },
  listTitle: {
    backgroundColor: "white",
    fontSize: RFValue(18),
    fontWeight: "500",
    lineHeight: 40,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  logo__container: {
    borderRadius: 50,
    height: d.width / 5,
    width: d.width / 5,
  },
  modal__button: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modal__buttonGroup: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 5,
  },
  modal__container: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "80%",
  },

  modal__content: {
    paddingHorizontal: 10,
  },

  modal__header: {
    fontSize: RFValue(16),
    fontWeight: "bold",

    marginBottom: 5,
    paddingHorizontal: 10,
  },
  name__text: {
    color: "white",
    fontFamily: "OpenSans_semiBold",
    fontSize: RFValue(16),
  },

  optionButtonStyle: {
    backgroundColor: "transparent",
    borderColor: "#FEC636",
    borderWidth: 1,
  },
  photoOrder__button: {
    alignItems: "center",
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 5,
    padding: 8,
  },
  photoOrder__text: {
    color: "white",
    fontWeight: "bold",
  },
  safeArea: {
    backgroundColor: "#121212",
    flex: 1,
  },

  sectionHeaderText: {
    color: "black",
    fontFamily: "OpenSans_bold",
    fontSize: RFValue(16),
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  sectionList: {
    backgroundColor: "white",
    height: "100%",
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.secondary,
    marginBottom: 5,
  },
  submitReport__button: {
    backgroundColor: "#63a34b",
    color: "white",
  },
  tabBar: {
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
  },

  tabText: {
    fontFamily: "OpenSans_semiBold",
    fontSize: RFValue(12.5),
    padding: 8,
  },

  text__container: {
    marginLeft: "5%",
    marginTop: "5%",
  },
  text__input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 6,
    height: 100,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    width: "100%",
  },
  top__container: {
    height: "30%",
    width: "100%",
  },
  upload__container: {
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "whitesmoke",
    borderWidth: 1,

    paddingVertical: 14,
    width: "80%",
  },
  upload__icon: {
    marginHorizontal: 5,
    marginRight: 10,
  },
  upload__image: {
    height: "100%",
    width: "100%",
  },
  upload__medium: {
    alignItems: "center",
    borderColor: "whitesmoke",
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5,
  },
  upload__modify: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderColor: "whitesmoke",
    borderWidth: 1,
    justifyContent: "center",
    marginTop: -29,
    opacity: 1,
    padding: 5,
    width: "100%",
  },
});
