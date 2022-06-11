import { StyleSheet } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
  border: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    top: 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    position: "absolute",
    top: "44%",
    zIndex: 2,
  },
  closeIcon: {
    marginRight: 10,
    margin: 10,
  },
  drawerItemContainer: {
    justifyContent: "center",
    marginLeft: 15,
    width: "70%",
  },
  iconContainer: {
    height: "12%",
  },
  image: {
    alignSelf: "center",
    borderRadius: 70 / 2,
    height: 70,
    marginLeft: 10,
    width: 70,
  },
  imageContainer: {
    justifyContent: "center",
    width: "30%",
  },
  labelStyle: {
    color: "white",
    fontSize: RFValue(16),
    fontWeight: "normal",
  },
  loginText: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  logo: {
    alignSelf: "center",
    bottom: 0,
    height: 100,
    opacity: 0.2,
    position: "absolute",
    resizeMode: "contain",
    width: "60%",
  },
  profileContainer: {
    alignContent: "center",
    flexDirection: "row",
    height: 100,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  sectionContainer: {
    flex: 1,
    marginTop: "2%",
  },
  sectionHeader: {
    color: "white",
    fontSize: RFValue(18),
    fontWeight: "normal",
    lineHeight: 20,
  },

  sectionLine: {
    backgroundColor: "white",
    height: 1,
    marginVertical: 5,
    width: "80%",
  },
  userClientId: {
    color: "white",
    fontSize: RFValue(12),
    fontWeight: "bold",
    lineHeight: 14,
    paddingBottom: 35,
  },
  userName: {
    color: "white",
    fontSize: RFValue(14),
    fontWeight: "500",
    lineHeight: 23,
  },
});
