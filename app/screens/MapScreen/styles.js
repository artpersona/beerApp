import { StyleSheet } from "react-native";
import { Colors, Layout } from "../../config";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  img: {
    width: 50,
    resizeMode: "contain",
  },
  filterContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 19,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 10,
  },
  mapContainer: {
    flexGrow: 1,
    marginTop: 0,
    paddingBottom: 100,
  },
  rowDetailsContainer: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    height: 93,
    position: "absolute",
    bottom: 30,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 19,
    backgroundColor: Colors.white,
  },
  rowDetails: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 40,
  },
  zoomContainer: {
    flex: 1,
    right: 0,
    flexDirection: "column",
    marginHorizontal: 20,
    alignItems: "flex-end",
    bottom: 120,
    position: "absolute",
  },
  zoomIn: {
    color: Colors.header,
    fontWeight: "300",
    fontSize: 30,
    lineHeight: 90,
    textAlign: "center",
  },
  zoomOut: {
    color: Colors.header,
    fontWeight: "300",
    fontSize: 50,
    lineHeight: 120,
    textAlign: "center",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 20,
    backgroundColor: "white",
    fontFamily: "OpenSans_semiBold",
    marginTop: "5%",
  },
  coverPhotoContainer: {
    maxHeight: 225,
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
  },
  aboutText: {
    textAlign: "justify",
    fontSize: RFValue(12.5),
    fontFamily: "OpenSans",
    marginVertical: "5%",
  },
});