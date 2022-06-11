import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { deviceWidth, deviceHeight } from "../../utils/device.utility";
export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.40)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: deviceHeight / 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  modalHeader: {
    width: "90%",
    alignItems: "flex-end",
    paddingTop: "3%",
  },

  modalContainer: {
    width: "100%",
    minHeight: deviceHeight / 2.5,
  },

  imageContainer: {
    width: "100%",
    height: deviceHeight / 5,
  },

  card__image: {
    width: "100%",
    height: "100%",
  },

  product__name: {
    fontWeight: "bold",
    marginTop: "10%",
    fontSize: RFValue(13),
  },
  actionsContainer: {
    width: "85%",
    alignSelf: "center",
    marginTop: "5%",
  },
  product__name: {
    fontWeight: "bold",
  },
  product__descript: {
    fontSize: RFValue(12),
    marginTop: "2%",
  },
  options__container: {
    marginTop: "3%",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    alignSelf: "center",
    marginVertical: "10%",
  },
  priceText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#FF891D",
    height: 80,
    width: "100%",
  },

  cartButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  cartButtonText: {
    alignItems: "center",
    fontWeight: "bold",
    lineHeight: 40,
  },
});
