import { StyleSheet } from "react-native";
import { Colors } from "../../config";
import { deviceHeight } from "../../utils/device.utility";
export default StyleSheet.create({
  badge: {
    bottom: 58,
    elevation: 40,
    position: "absolute",
    right: 18,
    zIndex: 1,
  },
  fab: {
    backgroundColor: Colors.primary,
    bottom: 0,
    margin: 16,
    position: "absolute",
    right: 0,
  },

  fab1Container: {
    bottom: 0,
    margin: 16,
    position: "absolute",
    right: 0,
  },

  // eslint-disable-next-line react-native/no-color-literals
  fab2: {
    backgroundColor: "#1877F2",
    bottom: deviceHeight / 1.5,
    margin: 16,
    position: "absolute",
    right: 0,
  },

  homeScreen: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 10,
  },

  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 10,
    textAlign: "center",
  },
});
