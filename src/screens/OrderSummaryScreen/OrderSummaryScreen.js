import React from "react";
import { FlatList, View, Text } from "react-native";
import { useOrderContext } from "../../context/OrderContext";
import { Button } from "react-native-elements";
import SummaryItem from "./SummaryItem";
import styles from "./styles";
import ListEmpty from "../../components/ListEmpty/ListEmpty";
function OrderSummaryScreen({ navigation }) {
  const { orders } = useOrderContext();

  const renderItem = ({ item, index }) => {
    return <SummaryItem product={item} key={index.toString()} />;
  };

  const navigateToCheckout = () => {
    navigation.navigate("Checkout");
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmpty type="order_summary" />}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 10,
          bottom: 0,
          borderColor: "whitesmoke",
          borderTopWidth: 2,
          minHeight: 100,
        }}
      >
        <Button
          title="Proceed to Checkout"
          buttonStyle={styles.buttonPrimary}
          containerStyle={styles.confirmOrderContainer}
          // titleStyle={Theme.center}
          onPress={navigateToCheckout}
          disabled={orders.length < 1}
        />
      </View>
    </View>
  );
}

export default OrderSummaryScreen;
