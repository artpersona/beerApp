import React, { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { HomeRoute } from "./routes/HomeRoute";
import { useFirebaseContext } from "./context/FirebaseContext";
import { registerForPushNotificationsAsync } from "./shared/utilities";
import { ShopsRoute } from "./routes/ShopsRoute";

export default function Main() {
  const { database } = useFirebaseContext();
  useEffect(() => {
    async function registerToken() {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        database
          .ref("sureplus")
          .child(
            token.split("-").join("").split("[").join("").split("]").join("")
          )
          .set({ expoToken: token });
      }
    }
    registerToken();
  }, []);

  return (
    <View style={styles.main}>
      <HomeRoute />
      {/* <ShopsRoute /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
