import { StyleSheet } from "react-native";
import { Colors } from "../../config";
import { deviceHeight } from "../../utils/device.utility";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  fab: {
    backgroundColor: Colors.tertiary,
    bottom: 0,
    color: Colors.white,
    margin: 16,
    position: "absolute",
    right: 0,
  },
  fab2: {
    backgroundColor: Colors.primary,
    bottom: deviceHeight / 10,
    margin: 16,
    position: "absolute",
    right: 0,
  },
  wrapper: {
    width: "95%",
    alignSelf: "center",
    marginTop: "5%",
  },
});
