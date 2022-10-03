/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { deviceHeight } from "../../utils/device.utility";
import { Colors } from "../../config";
export default StyleSheet.create({
  actionsContainer: {
    alignSelf: "center",
    marginTop: "5%",
    width: "85%",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  card__image: {
    height: "100%",
    width: "100%",
  },
  cartButton: {
    backgroundColor: Colors.primary,
    height: 80,
    width: "100%",
  },
  cartButtonContainer: {
    alignItems: "center",
    width: "100%",
  },

  cartButtonText: {
    alignItems: "center",
    fontWeight: "bold",
    lineHeight: 40,
  },

  centeredView: {
    backgroundColor: "rgba(0,0,0,0.40)",
    flex: 1,
    justifyContent: "center",
  },

  imageContainer: {
    height: deviceHeight / 5,
    width: "100%",
  },

  modalContainer: {
    minHeight: deviceHeight / 2.5,
    width: "100%",
  },

  modalHeader: {
    alignItems: "flex-end",
    paddingTop: "3%",
    width: "90%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    minHeight: deviceHeight / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  options__container: {
    marginTop: "3%",
  },
  priceText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  product__descript: {
    fontSize: RFValue(12),
    marginTop: "2%",
  },
  product__name: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    marginTop: "10%",
  },

  quantityContainer: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "10%",
    width: "85%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
