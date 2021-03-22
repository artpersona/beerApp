import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../shared/styles/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({ feed }) {
  // const sendNotifications = async (token) => {
  //   const message = {
  //     to: token,
  //     sound: "default",
  //     title: "Sureplus update",
  //     body: "New feed from Sureplus, check it out!",
  //     data: { data: "goes here" },
  //   };

  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // };

  // const notifyUsers = () => {
  //   db.collection("users")
  //     .get()
  //     .then((result) => {
  //       result.docs.map((doc) => sendNotifications(doc.id));
  //     });
  // };
  return (
    <LinearGradient
      colors={["#0FEFFD", "#FF00F5"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.card}>
        <View style={styles.card__header}>
          <View style={styles.card__headerLeft}>
            <Image
              source={require("../img/avatar.png")}
              style={styles.card__avatar}
            />
            <View>
              <Text style={styles.card__store}>{feed.store}</Text>
              <Text style={styles.card__handle}>@{feed.store}</Text>
            </View>
          </View>
          {/* <View style={styles.card__headerRight}>
          <Image
            source={require("../img/avatar.png")}
            style={styles.card__restaurant}
          />
        </View> */}
        </View>
        <View style={styles.card__body}>
          <View style={styles.card__imageContainer}>
            <Image
              source={{ uri: feed.imgUrl }}
              style={styles.card__image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.card__name}>{feed.name}</Text>
          <Text style={styles.card__caption}>{feed.caption}</Text>
          <TouchableOpacity>
            <View style={styles.card__button}>
              <Text style={styles.card__buttonText}>ORDER NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginVertical: 7,
    padding: 1,
    borderRadius: 5,
  },
  card: {
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
  },
  card__store: {
    color: "#fff",
    fontSize: 14,
  },
  card__handle: {
    textTransform: "lowercase",
    color: Colors.primary,
    fontSize: 10,
  },
  card__name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    // color: Colors.primary,
  },
  card__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  card__avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    margin: 5,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  // card__restaurant: {
  //   width: 25,
  //   height: 25,
  //   borderRadius: "50%",
  // },
  card__headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  card__body: {},
  card__caption: {
    fontSize: 16,
    paddingVertical: 10,
    // color: Colors.primary,
    color: "#C4C4C4",
  },
  card__imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
  },
  card__image: {
    flex: 1,
    height: 250,
    width: undefined,
    borderRadius: 5,
  },
  card__button: {
    backgroundColor: "purple",
    paddingVertical: 7,
    borderRadius: 5,
    marginVertical: 10,
  },
  card__buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
