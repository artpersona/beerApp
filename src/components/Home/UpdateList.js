import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Card";

export default function UpdateList({ feeds }) {
  return (
    <View style={styles.updateList}>
      <FlatList
        data={feeds}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card feed={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  updateList: {
    flex: 1,
    paddingVertical: 5,
  },
});
